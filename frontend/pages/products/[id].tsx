import { useParams } from 'next/navigation'
import Layout from '@/components/Layout'
import Head from 'next/head'
import { formatPrice } from '@/lib/utils'

interface Product {
  id: string
  name: string
  nameAr?: string
  price: number
  currency: string
  image: string
  rating?: number
  description?: string
  stock?: number
}

const mockProduct: Product = {
  id: '1',
  name: 'iPhone 15 Pro',
  nameAr: 'آيفون 15 برو',
  price: 3299,
  currency: 'TND',
  image: 'https://images.unsplash.com/photo-1678928136917-9e274e39e993?w=800&q=80',
  rating: 4.8,
  description: 'The iPhone 15 Pro features a titanium design, A17 Pro chip, and advanced camera system.',
  stock: 15,
}

export default function ProductDetail() {
  const params = useParams()
  const product = mockProduct

  return (
    <Layout title={product.name} description={product.description}>
      <Head>
        <title>{product.name} - Dropshipping Tunisia</title>
        <meta name="description" content={product.description || `Buy ${product.name} at the best price in Tunisia.`} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description || ''} />
        <meta property="og:url" content={`https://dropshipping.tn/products/${product.id}`} />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={product.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.description || ''} />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="mb-6 text-sm text-gray-500">
          <a href="/" className="text-blue-600 hover:underline">
            Home
          </a>
          <span className="mx-2 text-gray-300">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="h-64 lg:h-80 bg-gray-100 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              {product.nameAr && (
                <p className="text-gray-500 text-sm mb-4">{product.nameAr}</p>
              )}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="font-medium text-gray-700">{product.rating ?? 4.5}</span>
                <span className="text-gray-400 text-sm ml-1">({product.stock ?? 0} reviews)</span>
              </div>
              <div className="mb-6">
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(product.price, product.currency)}
                </span>
              </div>
              <div className="space-y-4">
                <button className="w-full btn-primary">
                  Add to Cart
                </button>
                <button className="w-full btn-outline">
                  Buy Now
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Product Details</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description || 'High-quality product with excellent features and reliable performance.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Specifications</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex justify-between">
                  <span>Brand</span>
                  <span className="font-medium text-gray-900">Apple</span>
                </li>
                <li className="flex justify-between">
                  <span>Model</span>
                  <span className="font-medium text-gray-900">iPhone 15 Pro</span>
                </li>
                <li className="flex justify-between">
                  <span>Storage</span>
                  <span className="font-medium text-gray-900">128GB</span>
                </li>
                <li className="flex justify-between">
                  <span>Color</span>
                  <span className="font-medium text-gray-900">Natural Titanium</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
