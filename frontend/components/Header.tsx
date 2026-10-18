'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ShoppingCart, Search, User, LogOut, ChevronRight } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Categories', href: '/categories' },
  { name: 'Deals', href: '/deals' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { user, logout, isAuthenticated, isLoading } = useAuth()
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DT</span>
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">Dropshipping Tunisia</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link href="/cart" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1">
              <ShoppingCart className="w-4 h-4" />
              <span className="font-medium">Cart</span>
              {itemCount > 0 && (
                <span className="ml-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            {isAuthenticated ? (
              <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name || user?.email}</p>
                  <p className="text-xs text-gray-500">{user?.is_admin ? 'Admin' : 'Customer'}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">
                    {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            ) : (
              <Link href="/account" className="text-gray-600 hover:text-blue-600 transition-colors" aria-label="Account">
                <User className="w-5 h-5" />
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-gray-600 hover:text-blue-600"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" /> Cart
            </Link>
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors rounded-lg"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            ) : (
              <Link
                href="/account"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 flex items-center gap-2"
              >
                <User className="w-4 h-4" /> Sign In
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-gray-900/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-6 py-4 bg-white text-gray-900 text-xl rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute right-6 top-6 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
