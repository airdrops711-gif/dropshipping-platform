'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { Product } from '@/types'

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const router = useRouter()

  return (
    <button
      onClick={() => {
        addItem(product, 1)
        router.push('/cart')
      }}
      className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
    >
      Add to Cart
    </button>
  )
}
