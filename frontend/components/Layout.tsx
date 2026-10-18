import { ReactNode, useEffect } from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
}

export default function Layout({ children, title, description }: LayoutProps) {
  useEffect(() => {
    document.title = title ? `${title} | Dropshipping Tunisia` : 'Dropshipping Tunisia'
  }, [title])

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Head>
            <title>{title ? `${title} | Dropshipping Tunisia` : 'Dropshipping Tunisia'}</title>
            <meta name="description" content={description || 'Best products at the best prices with fast delivery across Tunisia.'} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          </Head>
          <Header />
          <main className="flex-grow bg-gray-50">{children}</main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}
