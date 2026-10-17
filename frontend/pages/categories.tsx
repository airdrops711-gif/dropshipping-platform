import Link from 'next/link'
import Layout from '../components/Layout'
import { NextSeo } from 'next-seo'

export default function Categories() {
  const categories = [
    { name: 'Electronics', nameAr: 'إلكترونيات', slug: 'electronics', color: 'blue', desc: 'Phones, laptops, accessories' },
    { name: 'Fashion', nameAr: 'أزياء', slug: 'fashion', color: 'pink', desc: 'Clothing, shoes, watches' },
    { name: 'Home & Garden', nameAr: 'منزل وحديقة', slug: 'home-garden', color: 'green', desc: 'Furniture, decor, garden' },
    { name: 'Sports', nameAr: 'رياضات', slug: 'sports', color: 'orange', desc: 'Fitness, outdoor, equipment' },
    { name: 'Beauty', nameAr: 'جمال', slug: 'beauty', color: 'purple', desc: 'Cosmetics, skincare, health' },
    { name: 'Books', nameAr: 'كتب', slug: 'books', color: 'indigo', desc: 'Arabic & international books' },
    { name: 'Toys', nameAr: 'ألعاب', slug: 'toys', color: 'red', desc: 'Kids toys, games, educational' },
  ]

  return (
    <Layout>
      <NextSeo title="Categories - Dropshipping Tunisia" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Categories</h1>
        <p className="text-gray-600 mb-8">Browse products by category</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-t-4 border-${cat.color}-500`}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{cat.desc}</p>
                <span className="inline-block mt-3 text-blue-600 text-sm font-medium">
                  Browse →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}