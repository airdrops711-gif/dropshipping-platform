import { useSearchParams } from 'next/navigation'
import ProductGrid from '@/components/ProductGrid'
import Head from 'next/head'
import { api } from '@/lib/api'
import { useState, useEffect } from 'react'

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const categoryId = category ? Number(category) : undefined
    api.getProducts({
      category_id: categoryId,
      search: search || undefined,
      limit: 50,
    })
      .then((res: any) => {
        setProducts(res || [])
        setError(null)
      })
      .catch((err: any) => {
        setError(err.message || 'Failed to load products')
        setProducts([])
      })
      .finally(() => setLoading(false))
  }, [category, search])

  return (
    <>
      <Head>
        <title>Products - Dropshipping Tunisia</title>
        <meta name="description" content="Browse our catalog of quality products at the best prices." />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {category ? 'Category Products' : 'All Products'}
            </h1>
            <p className="text-gray-600">
              {products.length} product{products.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </>
  )
}
