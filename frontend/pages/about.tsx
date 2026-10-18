import Link from 'next/link'
import Layout from '../components/Layout'
import Head from 'next/head'

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About Us - Dropshipping Tunisia</title>
        <meta name="description" content="Learn about Dropshipping Tunisia's mission and why we're the best e-commerce platform in Tunisia." />
      </Head>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Dropshipping Tunisia</h1>
        <div className="prose prose-lg text-gray-700 space-y-6">
          <p>
            Dropshipping Tunisia is the leading e-commerce platform connecting Tunisian
            consumers with the best products from local and international suppliers.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-8">Our Mission</h2>
          <p>
            To make quality products accessible and affordable to everyone in Tunisia,
            with fast delivery and excellent customer service.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-8">Why Choose Us?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Wide selection of verified products across all categories</li>
            <li>Competitive pricing with daily deals and discounts</li>
            <li>Fast delivery across all regions of Tunisia</li>
            <li>Secure payment options and buyer protection</li>
            <li>Arabic and French customer support</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}
