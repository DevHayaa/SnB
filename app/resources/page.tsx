import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"

export default function ResourcesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="bg-gradient-to-b from-teal-800 to-teal-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Resources</h1>
          <p className="text-white text-lg max-w-3xl mx-auto">
            Access our library of resources to help you succeed in bidding and recruitment.
          </p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-teal-700 mb-4">Articles & Guides</h2>
            <p className="text-gray-700 mb-6">
              Browse our collection of articles and guides on bidding, recruitment, and industry best practices.
            </p>
            <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">View Articles</Button>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-teal-700 mb-4">Templates & Tools</h2>
            <p className="text-gray-700 mb-6">
              Download templates and tools to help you streamline your bidding and recruitment processes.
            </p>
            <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white">Access Templates</Button>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-teal-700 mb-4">Case Studies</h2>
            <p className="text-gray-700 mb-6">
              Learn from real-world examples of successful bidding and recruitment strategies.
            </p>
            <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">Read Case Studies</Button>
          </div>
        </div>
      </section>
    </main>
  )
}

