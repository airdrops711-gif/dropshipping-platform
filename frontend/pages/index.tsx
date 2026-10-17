import { useEffect } from 'react'
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
        description="Discover the best products in Tunisia at the most competitive prices. Fast delivery across Tunisia. Shop electronics, fashion, home & more."
        canonical="https://dropshipping.tn"
        openGraph={{
          url: 'https://dropshipping.tn',
          title: 'Dropshipping Tunisia',
          description: 'Best products, best prices, fast delivery in Tunisia',
          images: [{ url: '/og-image.jpg' }],
        }}
      />

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Dropshipping Tunisia
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Best Products, Best Prices, Fast Delivery Across Tunisia
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Shop Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <CategoryGrid categories={categories} />
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Delivery within 2-3 days across Tunisia</p>
            </div>
            <div>
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Best Prices</h3>
              <p className="text-gray-600">Guaranteed lowest prices in Tunisia</p>
            </div>
            <div>
              <div className="text-5xl mb-4">🔄</div>
              <h3 className="text-xl font-bold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy, no questions asked</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}