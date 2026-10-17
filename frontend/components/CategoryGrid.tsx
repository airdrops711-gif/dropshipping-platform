interface Category {
  name: string
  nameAr: string
  slug: string
  color: string
}

interface CategoryGridProps {
  categories: Category[]
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    pink: 'bg-pink-100 text-pink-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    purple: 'bg-purple-100 text-purple-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    red: 'bg-red-100 text-red-600',
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {categories.map((category) => (
        <div
          key={category.slug}
          className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer"
        >
          <div className={`w-16 h-16 mx-auto rounded-full ${colorClasses[category.color]} flex items-center justify-center text-2xl mb-3`}>
            {category.nameAr}
          </div>
          <h3 className="font-semibold text-gray-800 text-sm">{category.name}</h3>
        </div>
      ))}
    </div>
  )
}