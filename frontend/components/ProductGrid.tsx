interface Product {
  id: number | string
  name: string
  nameAr?: string
  price: number
  currency: string
  image: string
  rating?: number
  discount?: number
}

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
      {products.map((product) => (
        <a
          key={product.id}
          href={`/products/${product.id}`}
          className="group block"
        >
          <div className="card">
            {product.discount && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{product.discount}%
              </span>
            )}
            <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 text-sm sm:text-base line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              {product.nameAr && (
                <p className="text-xs text-gray-500 mb-3">{product.nameAr}</p>
              )}
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-gray-900 text-sm sm:text-base">
                  {product.price} {product.currency}
                </span>
                {product.discount && (
                  <span className="text-sm text-gray-400 line-through">
                    {Math.round(product.price / (1 - product.discount / 100))} {product.currency}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-xs">★</span>
                <span className="text-xs text-gray-600">{product.rating ?? 4.5}</span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}
