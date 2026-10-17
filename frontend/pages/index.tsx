import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import ProductGrid from '../components/ProductGrid'
import CategoryGrid from '../components/CategoryGrid'
import { NextSeo } from 'next-seo'

export default function Home() {
  const router = useRouter()

  const categories = [
    { name: 'Electronics', nameAr: 'إلكترونيات', slug: 'electronics', color: 'blue' },
    { name: 'Fashion', nameAr: 'أزياء', slug: 'fashion', color: 'pink' },
    { name: 'Home & Garden', nameAr: 'منزل وحديقة', slug: 'home-garden', color: 'green' },
    { name: 'Sports', nameAr: 'رياضات', slug: 'sports', color: 'orange' },
    { name: 'Beauty', nameAr: 'جمال', slug: 'beauty', color: 'purple' },
    { name: 'Books', nameAr: 'كتب', slug: 'books', color: 'indigo' },
    { name: 'Toys', nameAr: 'ألعاب', slug: 'toys', color: 'red' },
  ]

  const featuredProducts = [
    { id: 1, name: 'iPhone 15 Pro', nameAr: 'آيفون 15 برو', price: 3299, currency: 'TND', image: '/placeholder.jpg', rating: 4.8 },
    { id: 2, name: 'Samsung Galaxy S24', nameAr: 'سامسونج جالكسي S24', price: 2899, currency: 'TND', image: '/placeholder.jpg', rating: 4.7 },
    { id: 3, name: 'MacBook Air M3', nameAr: 'ماك بوك إير M3', price: 4599, currency: 'TND', image: '/placeholder.jpg', rating: 4.9 },
    { id: 4, name: 'Sony WH-1000XM5', nameAr: 'سوني هدAFX', price: 899, currency: 'TND', image: '/placeholder.jpg', rating: 4.8 },
  ]

  return (
    <Layout>
      <NextSeo
        title="Dropshipping Tunisia - Best Products at Best Prices"
        description="Discover the best products in Tunisia at the most competitive prices. Fast delivery across Tunisia."
        canonical="https://dropshipping.tn"
        openGraph={{
          url: 'https://dropshipping.tn',
          title: 'Dropshipping Tunisia',
          description: 'Best products, best prices, fast delivery in Tunisia',
          images: [{ url: '/og-image.jpg' }],
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Best Products, Best Prices
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8">
              Discover amazing products from Tunisia and around the world.
              Fast delivery, secure payments, and excellent customer service.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/categories" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center">
                Shop Now
              </Link>
              <Link href="/deals" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-center">
                View Deals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Shop by Category</h2>
          <Link href="/categories" className="text-blue-600 text-sm font-medium hover:underline">
            View all →
          </Link>
        </div>
        <CategoryGrid categories={categories} />
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Featured Products</h2>
          <Link href="/deals" className="text-blue-600 text-sm font-medium hover:underline">
            View all →
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl text-white p-6 sm:p-8 lg:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Free Delivery Across Tunisia</h2>
          <p className="text-orange-100 mb-6 max-w-xl mx-auto">
            Get free shipping on all orders above 200 TND. Fast delivery to all regions.
          </p>
          <Link href="/categories" className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors inline-block">
            Start Shopping
          </Link>
        </div>
      </section>
    </Layout>
  )
}