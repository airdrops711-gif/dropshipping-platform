import Layout from '@/components/Layout'
import Head from 'next/head'
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

const mockOrders: Order[] = [
  { id: 1, order_number: 'TN-20261018-A1B2C3D4', customer_name: 'Ahmed Ben Ali', total_amount: 3299, currency: 'TND', status: 'pending', payment_status: 'pending', created_at: '2026-10-18 01:45:00' },
  { id: 2, order_number: 'TN-20261018-E5F6G7H8', customer_name: 'Fatima Trabelsi', total_amount: 899, currency: 'TND', status: 'confirmed', payment_status: 'paid', created_at: '2026-10-18 00:30:00' },
  { id: 3, order_number: 'TN-20261017-I9J0K1L2', customer_name: 'Omar Gharbi', total_amount: 4599, currency: 'TND', status: 'shipped', payment_status: 'paid', created_at: '2026-10-17 22:15:00' },
  { id: 4, order_number: 'TN-20261017-M3N4O5P6', customer_name: 'Sara Khaldi', total_amount: 599, currency: 'TND', status: 'delivered', payment_status: 'paid', created_at: '2026-10-17 20:00:00' },
  { id: 5, order_number: 'TN-20261017-Q7R8S9T0', customer_name: 'Youssef Mrad', total_amount: 2899, currency: 'TND', status: 'cancelled', payment_status: 'refunded', created_at: '2026-10-17 18:30:00' },
]

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

export default function AdminOrders() {
  return (
    <Layout title="Order Management - Admin">
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
                {mockOrders.map((order) => (
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}