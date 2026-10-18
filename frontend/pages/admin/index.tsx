import { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout'
import Head from 'next/head'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  BarChart3, 
  Shield, 
  Plus,
  LogOut
} from 'lucide-react'

const adminNav = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Scraping', href: '/admin/scraping', icon: Shield },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <Layout title="Admin Dashboard - Dropshipping Tunisia">
      <Head>
        <title>Admin Dashboard - Dropshipping Tunisia</title>
        <meta name="description" content="Admin panel for managing products, orders, and analytics." />
      </Head>

      <div className="flex flex-col h-screen overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DT</span>
            </div>
            <span className="font-bold text-lg text-gray-900">Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-primary-600 transition-colors" aria-label="Notifications">
              <span className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </span>
            </button>
            <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">saif711@example.com</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">SU</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-50 border-r border-gray-100 flex-shrink-0">
            <div className="p-6">
              <nav className="space-y-1">
                {adminNav.map((item) => {
                  const Icon = item.icon
                  const isActive = activeTab === item.name.toLowerCase().split(' ')[0]
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setActiveTab(item.name.toLowerCase().split(' ')[0])}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
            <div className="p-6 border-t border-gray-100 mt-auto">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors rounded-lg">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </aside>

          {/* Content Area */}
          <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-600">Welcome back, Admin. Here's what's happening with your store.</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Products</p>
                      <p className="text-2xl font-bold text-gray-900">1,234</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                      <Package className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">+12% from last month</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Orders</p>
                      <p className="text-2xl font-bold text-gray-900">567</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">+8% from last month</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">45,230 TND</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">+15% from last month</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pending Orders</p>
                      <p className="text-2xl font-bold text-gray-900">23</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                      <Shield className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Requires attention</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <Link href="/admin/products" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-colors">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                      <Plus className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Add Product</h3>
                    <p className="text-sm text-gray-500">Add a new product to the catalog</p>
                  </Link>
                  <Link href="/admin/orders" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-colors">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                      <ShoppingCart className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Manage Orders</h3>
                    <p className="text-sm text-gray-500">View and update order statuses</p>
                  </Link>
                  <Link href="/admin/scraping" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-colors">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
                      <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Run Scraping</h3>
                    <p className="text-sm text-gray-500">Trigger product data scraping</p>
                  </Link>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="px-6 py-3 text-sm font-medium text-gray-500">Time</th>
                        <th className="px-6 py-3 text-sm font-medium text-gray-500">Action</th>
                        <th className="px-6 py-3 text-sm font-medium text-gray-500">User</th>
                        <th className="px-6 py-3 text-sm font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-600">2 min ago</td>
                        <td className="px-6 py-4 text-sm text-gray-900">New order placed</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Customer #1234</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Pending</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-600">15 min ago</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Product updated</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Admin</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Active</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-600">1 hour ago</td>
                        <td className="px-6 py-4 text-sm text-gray-900">New user registered</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Customer #5678</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">Verified</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  )
}