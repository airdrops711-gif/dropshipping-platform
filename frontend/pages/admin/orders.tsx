import { useState, useEffect } from 'react'
import Head from 'next/head'
import { api } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Clock, CheckCircle, AlertCircle } from 'lucide-react'

interface Order {
  id: number
  order_number: string
  customer_name: string
  total_amount: number
  currency: string
  status: string
  payment_status: string
  created_at: string
}

export default function AdminOrders() {
  const { isLoading, requireAdmin } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
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
    api.adminListOrders().then((res: any) => {
      setOrders(res || [])
    }).finally(() => setLoading(false))
  }, [])

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-blue-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    refunded: 'bg-red-100 text-red-700',
  }

  const paymentColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    paid: 'bg-green-100 text-green-700',
    refunded: 'bg-red-100 text-red-700',
    failed: 'bg-red-100 text-red-700',
  }

  return (
    <>
      <Head>
        <title>Order Management - Admin Panel</title>
        <meta name="description" content="Manage orders in the admin panel." />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600">View and manage customer orders.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Order #</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Customer</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Total</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Status</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Payment</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Date</th>
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
                ) : orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">{order.order_number}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{order.customer_name}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.total_amount} {order.currency}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${paymentColors[order.payment_status]}`}>
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{order.created_at}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors" title="View Details">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && !loading && (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center">
                      <p className="text-gray-500">No orders found.</p>
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
