import Link from 'next/link'
import Layout from '@/components/Layout'
import CategoryGrid from '@/components/CategoryGrid'
import Head from 'next/head'

const categories = [
  { name: 'Electronics', nameAr: 'إلكترونيات', slug: 'electronics', color: 'blue', desc: 'Phones, laptops, accessories' },
  { name: 'Fashion', nameAr: 'أزياء', slug: 'fashion', color: 'pink', desc: 'Clothing, shoes, watches' },
  { name: 'Home & Garden', nameAr: 'منزل وحديقة', slug: 'home-garden', color: 'green', desc: 'Furniture, decor, garden' },
  { name: 'Sports', nameAr: 'رياضات', slug: 'sports', color: 'orange', desc: 'Fitness, outdoor, equipment' },
  { name: 'Beauty', nameAr: 'جمال', slug: 'beauty', color: 'purple', desc: 'Cosmetics, skincare, health' },
  { name: 'Books', nameAr: 'كتب', slug: 'books', color: 'indigo', desc: 'Arabic & international books' },
  { name: 'Toys', nameAr: 'ألعاب', slug: 'toys', color: 'red', desc: 'Kids toys, games, educational' },
]

export default function Categories() {
  return (
    <Layout title="Categories - Dropshipping Tunisia" description="Browse products by category.">
      <Head>
        <title>Categories - Dropshipping Tunisia</title>
        <meta name="description" content="Browse products by category." />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Categories</h1>
          <p className="text-gray-600">Browse products by category</p>
        </div>
        <CategoryGrid categories={categories} />
      </div>
    </Layout>
  )
}
