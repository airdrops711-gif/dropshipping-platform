import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const toggleLanguage = () => {
    const newLocale = router.locale === 'en' ? 'ar' : 'en'
    router.push(router.pathname, router.asPath, { locale: newLocale })
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              DT
            </div>
            <span className="text-xl font-bold text-gray-800">Dropshipping Tunisia</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-blue-600 font-medium">
              Categories
            </Link>
            <Link href="/deals" className="text-gray-700 hover:text-blue-600 font-medium">
              Deals
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded hover:bg-gray-100"
              aria-label="Toggle Language"
            >
              {router.locale === 'en' ? 'العربية' : 'English'}
            </button>
            <button className="p-2 rounded hover:bg-gray-100">
              🛒
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
              <Link href="/categories" className="text-gray-700 hover:text-blue-600">Categories</Link>
              <Link href="/deals" className="text-gray-700 hover:text-blue-600">Deals</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}