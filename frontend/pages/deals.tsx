import Link from 'next/link'
import Head from 'next/head'

export default function Deals() {
  const deals = [
    { id: 1, name: 'iPhone 15 Pro', price: 3299, original: 3999, discount: 18, image: '/placeholder.jpg', rating: 4.8 },
    { id: 2, name: 'Samsung Galaxy S24', price: 2899, original: 3299, discount: 12, image: '/placeholder.jpg', rating: 4.7 },
    { id: 3, name: 'MacBook Air M3', price: 4599, original: 5299, discount: 13, image: '/placeholder.jpg', rating: 4.9 },
    { id: 4, name: 'Sony WH-1000XM5', price: 899, original: 1099, discount: 18, image: '/placeholder.jpg', rating: 4.8 },
  ]

  return (
    <>
      <Head>
        <title>Deals - Dropshipping Tunisia</title>
        <meta name="description" content="Best discounts and limited-time offers on quality products in Tunisia." />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Deals of the Day</h1>
        <p className="text-gray-600 mb-8">Best discounts and limited-time offers</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {deals.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <span className="text-6xl">📦</span>
                </div>
                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  -{product.discount}%
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center mt-2">
                  <span className="text-lg font-bold text-gray-900">{product.price} TND</span>
                  <span className="text-sm text-gray-400 line-through ml-2">{product.original} TND</span>
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm text-gray-500 ml-1">{product.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
