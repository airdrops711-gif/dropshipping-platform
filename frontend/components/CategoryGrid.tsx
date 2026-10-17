interface Category {
  name: string
  nameAr: string
  slug: string
  color: string
}

const colorMap: Record<string, { bg: string; border: string }> = {
  blue: { bg: 'bg-blue-100', border: 'border-blue-500' },
  pink: { bg: 'bg-pink-100', border: 'border-pink-500' },
  green: { bg: 'bg-green-100', border: 'border-green-500' },
  orange: { bg: 'bg-orange-100', border: 'border-orange-500' },
  purple: { bg: 'bg-purple-100', border: 'border-purple-500' },
  indigo: { bg: 'bg-indigo-100', border: 'border-indigo-500' },
  red: { bg: 'bg-red-100', border: 'border-red-500' },
}

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4">
      {categories.map((cat) => {
        const colors = colorMap[cat.color] || colorMap.blue
        return (
          <a
            key={cat.slug}
            href={`/products?category=${cat.slug}`}
            className="group bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 text-center border-b-4 hover:-translate-y-1"
            style={{ borderBottomColor: colors.border.replace('border-', '#').replace('500', '500') }}
          >
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full flex items-center justify-center text-2xl mb-3 ${colors.bg}`}
            >
              📦
            </div>
            <h3 className="font-bold text-gray-800 text-sm sm:text-base group-hover:text-blue-600 transition-colors">
              {cat.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1 hidden sm:block">{cat.nameAr}</p>
          </a>
        )
      })}
    </div>
  )
}