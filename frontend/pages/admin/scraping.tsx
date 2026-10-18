import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import Head from 'next/head'
import { api } from '@/lib/api'
import { Play, RefreshCw, Clock, Database, AlertTriangle } from 'lucide-react'

interface ScrapingJob {
  id: number
  source_name: string
  status: string
  products_found: number
  products_added: number
  created_at: string
  error_message?: string
}

export default function AdminScraping() {
  const [jobs, setJobs] = useState<ScrapingJob[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleRunScraping = async () => {
    setIsRunning(true)
    try {
      const response = await api.adminRunScraping()
      setJobs((prev) => [...prev, {
        id: Date.now(),
        source_name: 'all',
        status: 'completed',
        products_found: response.products_found || 0,
        products_added: response.products_added || 0,
        created_at: new Date().toISOString(),
      }])
      alert(`Scraping completed: ${response.products_added} products added`)
    } catch (error: any) {
      alert('Scraping failed: ' + error.message)
    } finally {
      setIsRunning(false)
    }
  }

  useEffect(() => {
    api.adminListScrapingJobs().then((res: any) => {
      setJobs(res || [])
    }).finally(() => setLoading(false))
  }, [])

  const statusColors: Record<string, string> = {
    completed: 'bg-green-100 text-green-700',
    running: 'bg-blue-100 text-blue-700',
    failed: 'bg-red-100 text-red-700',
    pending: 'bg-yellow-100 text-yellow-700',
  }

  return (
    <Layout title="Scraping Controls - Admin">
      <Head>
        <title>Scraping Controls - Admin Panel</title>
        <meta name="description" content="Manage product scraping jobs." />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Scraping Controls</h1>
          <p className="text-gray-600">Trigger product data scraping from external sources.</p>
        </div>

        {/* Run Scraping Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Run Scraping Job</h2>
              <p className="text-gray-600 text-sm">Scrape products from configured sources and add them to the catalog.</p>
            </div>
            <button
              onClick={handleRunScraping}
              disabled={isRunning}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
            >
              {isRunning ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" /> Running...
                </div>
              ) : (
                <>
                  <Play className="w-4 h-4" /> Run Scraping
                </>
              )}
            </button>
          </div>
        </div>

        {/* Scraping Jobs Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Job ID</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Source</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Status</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Products Found</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Products Added</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Created At</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500 text-right">Error</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-600">#{job.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{job.source_name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[job.status]}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{job.products_found}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{job.products_added}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{job.created_at}</td>
                    <td className="px-6 py-4 text-right">
                      {job.error_message ? (
                        <button className="text-xs text-red-600 hover:underline" title={job.error_message}>
                          <AlertTriangle className="w-3 h-3 inline mr-1" /> Error
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
                {jobs.length === 0 && !loading && (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center">
                      <p className="text-gray-500">No scraping jobs found.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Configured Sources */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Configured Sources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'Jumia Tunisia', url: 'jumia.tn', status: 'Active' },
              { name: 'Makino Tunisia', url: 'makino.tn', status: 'Active' },
              { name: 'Amazon Morocco', url: 'amazon.ma', status: 'Active' },
            ].map((source) => (
              <div key={source.name} className="p-4 rounded-lg border border-gray-100 bg-gray-50">
                <p className="text-sm font-medium text-gray-900">{source.name}</p>
                <p className="text-xs text-gray-500">{source.url}</p>
                <span className="mt-2 inline-block px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded">
                  {source.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
