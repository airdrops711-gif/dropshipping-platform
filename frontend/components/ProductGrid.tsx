interface Product {
  id: number
  name: string
  nameAr?: string
  price: number
  currency: string
  image: string
  rating?: number
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              Sale
            </span>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-800 mb-2 truncate">{product.name}</h3>
            <div className="flex items-center justify-between">
              <span className="text-blue-600 font-bold text-lg">
                {product.price} {product.currency}
              </span>
              {product.rating && (
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                </div>
              )}
            </div>
            <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}