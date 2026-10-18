interface Category {
  name: string
  nameAr: string
  slug: string
  color: string
}

const colorClasses: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
  pink: { bg: 'bg-pink-50', text: 'text-pink-600' },
  green: { bg: 'bg-green-50', text: 'text-green-600' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600' },
  red: { bg: 'bg-red-50', text: 'text-red-600' },
}

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
      {categories.map((cat) => {
        const colors = colorClasses[cat.color] || colorClasses.blue
        return (
          <a
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="group card flex flex-col items-center justify-center p-4 sm:p-6 text-center hover:border-blue-200"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-2xl ${colors.bg} ${colors.text} group-hover:bg-blue-600 group-hover:text-white transition-all duration-300`}>
              📦
            </div>
            <h3 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-blue-600 transition-colors mb-1">
              {cat.name}
            </h3>
            <p className="text-xs text-gray-500">{cat.nameAr}</p>
          </a>
        )
      })}
    </div>
  )
}
