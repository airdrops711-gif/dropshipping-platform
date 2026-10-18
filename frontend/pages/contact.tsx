import Link from 'next/link'
import Layout from '../components/Layout'
import Head from 'next/head'

export default function Contact() {
  return (
    <Layout>
      <Head>
        <title>Contact - Dropshipping Tunisia</title>
        <meta name="description" content="Contact Dropshipping Tunisia for support, questions, or inquiries. We're here to help." />
      </Head>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-blue-600 text-xl">📍</span>
                <div>
                  <p className="font-medium text-gray-800">Address</p>
                  <p className="text-gray-600">Tunis, Tunisia</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-blue-600 text-xl">📞</span>
                <div>
                  <p className="font-medium text-gray-800">Phone</p>
                  <p className="text-gray-600">+216 XX XXX XXXX</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-blue-600 text-xl">✉️</span>
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                  <p className="text-gray-600">contact@dropshipping.tn</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
