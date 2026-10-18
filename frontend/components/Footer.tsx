export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DT</span>
              </div>
              <span className="font-bold text-xl text-white tracking-tight">Dropshipping Tunisia</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Best products at the best prices with fast delivery across Tunisia.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <span className="text-white text-sm">f</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <span className="text-white text-sm">t</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <span className="text-white text-sm">i</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-6">Shop</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-400 text-sm hover:text-white transition-colors">Home</a></li>
              <li><a href="/categories" className="text-gray-400 text-sm hover:text-white transition-colors">Categories</a></li>
              <li><a href="/deals" className="text-gray-400 text-sm hover:text-white transition-colors">Deals</a></li>
              <li><a href="/about" className="text-gray-400 text-sm hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-6">Support</h3>
            <ul className="space-y-3">
              <li><a href="/contact" className="text-gray-400 text-sm hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Shipping</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Returns</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-6">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-6">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe for updates and offers.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Dropshipping Tunisia. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
