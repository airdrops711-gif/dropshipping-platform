const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://backend-saif711-dev.apps.rm3.7wse.p1.openshiftapps.com/api/v1'

const REQUEST_TIMEOUT = 10000
const MAX_RETRIES = 2

class ApiClient {
  private base: string
  private token: string | null = null

  constructor(base: string) {
    this.base = base
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token')
    }
  }

  setToken(token: string | null) {
    this.token = token
    if (typeof window !== 'undefined') {
      if (token) localStorage.setItem('token', token)
      else localStorage.removeItem('token')
    }
  }

  private async requestWithTimeout(url: string, options: RequestInit): Promise<Response> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)
    try {
      const res = await fetch(url, { ...options, signal: controller.signal })
      clearTimeout(timeoutId)
      return res
    } catch (err) {
      clearTimeout(timeoutId)
      throw err
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    let lastError: Error | null = null

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const res = await this.requestWithTimeout(`${this.base}${endpoint}`, {
          ...options,
          headers,
        })

        if (!res.ok) {
          const error = await res.json().catch(() => ({ detail: 'Unknown error' }))
          throw new Error(error.detail || `Request failed: ${res.status}`)
        }

        return res.json()
      } catch (err: any) {
        lastError = err
        if (err.message.includes('401') || err.message.includes('403') || err.message.includes('404')) {
          throw err
        }
        if (attempt < MAX_RETRIES) {
          await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)))
        }
      }
    }

    throw lastError || new Error('Request failed after retries')
  }

  // Products
  getProducts(params?: {
    skip?: number
    limit?: number
    category_id?: number
    supplier_id?: number
    status?: string
    search?: string
    min_price?: number
    max_price?: number
    sort_by?: string
    sort_order?: string
  }) {
    const qs = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) qs.set(k, String(v))
      })
    }
    return this.request<any>(`/products?${qs.toString()}`)
  }

  getProduct(id: number | string) {
    return this.request<any>(`/products/${id}`)
  }

  getCategories() {
    return this.request<any[]>(`/products/categories/list`)
  }

  getFeatured(limit = 10) {
    return this.request<any[]>(`/products/featured/list?limit=${limit}`)
  }

  // Admin
  getDashboardStats() {
    return this.request<any>(`/admin/dashboard/stats`)
  }

  getDailyAnalytics(days = 30) {
    return this.request<any[]>(`/admin/dashboard/analytics/daily?days=${days}`)
  }

  getCategoryAnalytics() {
    return this.request<any[]>(`/admin/dashboard/analytics/categories`)
  }

  adminListProducts(params?: { skip?: number; limit?: number; status?: string }) {
    const qs = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) qs.set(k, String(v))
      })
    }
    return this.request<any[]>(`/admin/products?${qs.toString()}`)
  }

  adminCreateProduct(data: any) {
    return this.request<any>(`/admin/products`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  adminUpdateProduct(id: number, data: any) {
    return this.request<any>(`/admin/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  adminDeleteProduct(id: number) {
    return this.request<any>(`/admin/products/${id}`, { method: 'DELETE' })
  }

  adminApproveProduct(id: number) {
    return this.request<any>(`/admin/products/${id}/approve`, { method: 'POST' })
  }

  adminListOrders(params?: { skip?: number; limit?: number; status?: string }) {
    const qs = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) qs.set(k, String(v))
      })
    }
    return this.request<any[]>(`/admin/orders?${qs.toString()}`)
  }

  adminUpdateOrderStatus(id: number, status: string) {
    return this.request<any>(`/admin/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    })
  }

  adminListUsers(params?: { skip?: number; limit?: number }) {
    const qs = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) qs.set(k, String(v))
      })
    }
    return this.request<any[]>(`/admin/users?${qs.toString()}`)
  }

  adminUpdateUserRole(id: number, isAdmin: boolean) {
    return this.request<any>(`/admin/users/${id}/role`, {
      method: 'PUT',
      body: JSON.stringify({ is_admin: isAdmin }),
    })
  }

  adminListScrapingJobs(params?: { skip?: number; limit?: number }) {
    const qs = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) qs.set(k, String(v))
      })
    }
    return this.request<any[]>(`/admin/scraping/jobs?${qs.toString()}`)
  }

  adminRunScraping(sourceName?: string) {
    const qs = new URLSearchParams()
    if (sourceName) qs.set('source_name', sourceName)
    return this.request<any>(`/admin/scraping/run?${qs.toString()}`, {
      method: 'POST',
    })
  }

  // Auth
  login(email: string, password: string) {
    return this.request<{ access_token: string; token_type: string }>(
      `/auth/login`,
      { method: 'POST', body: JSON.stringify({ email, password }) }
    )
  }

  register(data: { email: string; password: string; name?: string; phone?: string }) {
    return this.request<any>(`/auth/register`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Orders
  createOrder(data: any) {
    return this.request<any>(`/orders/`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  getOrders() {
    return this.request<any[]>(`/orders/`)
  }
}

export const api = new ApiClient(API_BASE)
