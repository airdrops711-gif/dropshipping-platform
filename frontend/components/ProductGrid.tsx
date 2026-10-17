interface Product {
  id: number
  name: string
  price: number
  currency: string
  image: string
  rating: number
}

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {products.map((product) => (
        <a
          key={product.id}
          href={`/products/${product.id}`}
          className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
        >
          <div className="relative w-full aspect-square bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
            <span className="text-4xl sm:text-6xl">📦</span>
          </div>
          <div className="p-3 sm:p-4">
            <h3 className="font-bold text-gray-800 text-sm sm:text-base group-hover:text-blue-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-base sm:text-lg font-bold text-gray-900">
                {product.price} {product.currency}
              </span>
              <div className="flex items-center">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-xs sm:text-sm text-gray-500 ml-1">{product.rating}</span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}