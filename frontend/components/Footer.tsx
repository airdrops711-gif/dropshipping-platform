import { ReactNode } from 'react'

interface FooterProps {
  children?: ReactNode
}

export default function Footer({ children }: FooterProps) {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        {children || (
          <>
            <p className="text-sm">&copy; {new Date().getFullYear()} Dropshipping Tunisia. All rights reserved.</p>
          </>
        )}
      </div>
    </footer>
  )
}
