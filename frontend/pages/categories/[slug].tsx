'use client'

import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import ProductGrid from '@/components/ProductGrid'
import Head from 'next/head'
import { api } from '@/lib/api'
import { useState, useEffect } from 'react'

export default function CategoryPage() {
  const router = useRouter()
  const { slug } = router.query
  const slugStr = typeof slug === 'string' ? slug : slug ? Array.isArray(slug) ? slug[0] : String(slug) : ''
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let categoryId: number | undefined

    const loadCategory = async () => {
      try {
        // Fetch categories to resolve slug to ID
        const categories = await api.getCategories()
        const match = (categories || []).find(
          (c: any) => c.slug === slugStr || c.name_en?.toLowerCase() === slugStr.toLowerCase()
        )
        categoryId = match?.id

        // Fetch products for this category
        const res = await api.getProducts({
          category_id: categoryId,
          limit: 50,
        })
        setProducts(res || [])
        setError(null)
      } catch (err: any) {
        setError(err.message || 'Failed to load category products')
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    loadCategory()
  }, [slugStr])

  return (
    <Layout title={`Category - ${slugStr} - Dropshipping Tunisia`} description={`Browse ${slugStr} products.`}>
      <Head>
        <title>{slugStr} - Dropshipping Tunisia</title>
        <meta name="description" content={`Browse ${slugStr} products at the best prices.`} />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{slugStr}</h1>
          <p className="text-gray-600">Browse {slugStr} products</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-gray-600">{products.length} product{products.length !== 1 ? 's' : ''} found</p>
              </div>
            </div>
            <ProductGrid products={products} />
          </>
        )}
      </div>
    </Layout>
  )
}
