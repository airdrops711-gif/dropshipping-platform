'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Head from 'next/head'
import { formatPrice } from '@/lib/utils'
import { api } from '@/lib/api'
import { useState, useEffect } from 'react'
import AddToCartButton from '@/components/AddToCartButton'

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

export default function ProductDetail() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!params.id) return
    const id = Number(params.id)
    api.getProduct(id)
      .then((res: any) => {
        setProduct({
          id: res.id,
          name: res.name_en || res.name,
          nameAr: res.name_ar,
          price: res.price,
          currency: res.currency,
          image: res.main_image || (res.images?.[0] || ''),
          rating: res.rating,
          description: res.description_en || res.description,
          stock: res.stock_quantity,
        })
        setError(null)
      })
      .catch((err: any) => {
        setError(err.message || 'Failed to load product')
        setProduct(null)
      })
      .finally(() => setLoading(false))
  }, [params?.id])

  if (loading && !product && !error) {
    return (
      <>
        <Head><title>Loading...</title></Head>
        <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Head><title>Product Not Found</title></Head>
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 inline-block">
            <h2 className="text-xl font-bold text-red-800 mb-2">Product Not Found</h2>
            <p className="text-red-600 text-sm">{error}</p>
            <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline font-medium">
              Back to Home
            </Link>
          </div>
        </div>
      </>
    )
  }

  if (!product) {
    return (
      <>
        <Head><title>Product Not Found</title></Head>
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 inline-block">
            <h2 className="text-xl font-bold text-red-800 mb-2">Product Not Found</h2>
            <p className="text-red-600 text-sm">{error || 'The product you are looking for does not exist.'}</p>
            <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline font-medium">
              Back to Home
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
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
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
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
                <AddToCartButton product={product as any} />
                <button className="w-full border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors">
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
          </div>
        </div>
      </div>
    </>
  )
}
