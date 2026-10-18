export interface Product {
  id: number
  name: string
  name_ar?: string
  name_en?: string
  description?: string
  description_ar?: string
  price: number
  original_price?: number
  currency: string
  stock_quantity: number
  sku?: string
  brand?: string
  model?: string
  images: string[]
  main_image?: string
  category_id?: number
  supplier_id?: number
  status: string
  is_featured: boolean
  tags: string[]
  view_count: number
  sales_count: number
  rating: number
  rating_count: number
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name_ar: string
  name_en: string
  slug: string
  parent_id?: number
  level: number
  sort_order: number
  is_active: boolean
}

export interface Order {
  id: number
  order_number: string
  customer_name: string
  customer_email?: string
  customer_phone?: string
  shipping_address: string
  shipping_city?: string
  shipping_postal_code?: string
  total_amount: number
  currency: string
  status: string
  payment_method?: string
  payment_status: string
  payment_id?: string
  tracking_number?: string
  supplier_id?: number
  notes?: string
  created_at: string
  updated_at: string
  items: OrderItem[]
}

export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  quantity: number
  unit_price: number
  total_price: number
}

export interface User {
  id: number
  email: string
  password_hash?: string
  name?: string
  phone?: string
  is_active: boolean
  is_admin: boolean
  created_at: string
  updated_at: string
}

export interface ScrapingJob {
  id: number
  source_name: string
  source_url?: string
  status: string
  products_found: number
  products_added: number
  last_run?: string
  next_run?: string
  error_message?: string
  created_at: string
}

export interface DashboardStats {
  total_products: number
  active_products: number
  pending_products: number
  total_orders: number
  total_revenue: number
  pending_orders: number
  total_customers: number
  recent_orders_7d: number
  recent_revenue_7d: number
  top_products: Array<{
    id: number
    name: string
    price: number
    total_sold: number
  }>
}

export interface DailyAnalytics {
  date: string
  orders: number
  revenue: number
}

export interface CategoryAnalytics {
  id: number
  name_en: string
  name_ar: string
  product_count: number
  total_sold: number
}
