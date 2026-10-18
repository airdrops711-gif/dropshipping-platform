import { useState, useEffect } from 'react'
import Head from 'next/head'
import { api } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { Plus, Search, Edit, Trash2, CheckCircle, Clock } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  currency: string
  status: string
  stock_quantity: number
  category?: string
  created_at: string
}

export default function AdminProducts() {
  const { isLoading, requireAdmin } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !requireAdmin()) {
      router.push('/account')
    }
  }, [isLoading, requireAdmin, router])

  if (isLoading || !requireAdmin()) {
    return null
  }

  useEffect(() => {
    api.adminListProducts().then((res: any) => {
      setProducts(res || [])
    }).finally(() => setLoading(false))
  }, [])

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    pending_review: 'bg-yellow-100 text-yellow-700',
    out_of_stock: 'bg-red-100 text-red-700',
    discontinued: 'bg-gray-100 text-gray-700',
  }

  return (
    <>
      <Head>
        <title>Product Management - Admin Panel</title>
        <meta name="description" content="Manage products in the admin panel." />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
            <p className="text-gray-600">Manage your product catalog and inventory.</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending_review">Pending Review</option>
              <option value="out_of_stock">Out of Stock</option>
              <option value="discontinued">Discontinued</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Product</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Category</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Price</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Stock</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Status</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Created</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <span className="text-sm">📦</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">SKU: DT-{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.category || '-'}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.price} {product.currency}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.stock_quantity === 0 ? (
                        <span className="text-red-600 font-medium">Out of Stock</span>
                      ) : (
                        product.stock_quantity
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[product.status]}`}>
                        {product.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{product.created_at}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && !loading && (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center">
                      <p className="text-gray-500">No products found.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
