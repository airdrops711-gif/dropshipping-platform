import { useSearchParams } from 'next/navigation'
import Layout from '@/components/Layout'
import ProductGrid from '@/components/ProductGrid'
import Head from 'next/head'

const allProducts = [
  { id: 1, name: 'iPhone 15 Pro', nameAr: 'آيفون 15 برو', price: 3299, currency: 'TND', image: 'https://images.unsplash.com/photo-1678928136917-9e274e39e993?w=600&q=80', rating: 4.8, category: 'electronics' },
  { id: 2, name: 'Samsung Galaxy S24', nameAr: 'سامسونج جالكسي S24', price: 2899, currency: 'TND', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80', rating: 4.7, category: 'electronics' },
  { id: 3, name: 'MacBook Air M3', nameAr: 'ماك بوك إير M3', price: 4599, currency: 'TND', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80', rating: 4.9, category: 'electronics' },
  { id: 4, name: 'Sony WH-1000XM5', nameAr: 'سوني WH-1000XM5', price: 899, currency: 'TND', image: 'https://images.unsplash.com/photo-1583394838336-acd677ed66f1?w=600&q=80', rating: 4.8, category: 'electronics' },
  { id: 5, name: 'Nike Air Max', nameAr: 'نايكي إير ماكس', price: 599, currency: 'TND', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', rating: 4.6, category: 'fashion' },
  { id: 6, name: 'Levi\'s Jeans', nameAr: 'جينز ليفيز', price: 349, currency: 'TND', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80', rating: 4.5, category: 'fashion' },
  { id: 7, name: 'IKEA Desk Lamp', nameAr: 'مصباح مكتب إيكيا', price: 199, currency: 'TND', image: 'https://images.unsplash.com/photo-1507473885765-e2ed079f03c7?w=600&q=80', rating: 4.4, category: 'home-garden' },
  { id: 8, name: 'Yoga Mat', nameAr: 'حصيرة يوجا', price: 129, currency: 'TND', image: 'https://images.unsplash.com/photo-1544367567-0f21b003405e?w=600&q=80', rating: 4.3, category: 'sports' },
]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')

  const filteredProducts = category
    ? allProducts.filter((p) => p.category === category)
    : allProducts

  return (
    <Layout title="Products - Dropshipping Tunisia" description="Browse our catalog of quality products at the best prices.">
      <Head>
        <title>Products - Dropshipping Tunisia</title>
        <meta name="description" content="Browse our catalog of quality products at the best prices." />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {category ? 'Category Products' : 'All Products'}
            </h1>
            <p className="text-gray-600">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>
        <ProductGrid products={filteredProducts} />
      </div>
    </Layout>
  )
}
