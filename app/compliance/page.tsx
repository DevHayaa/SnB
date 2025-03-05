import Link from "next/link"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"

export default function CompliancePage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="bg-gradient-to-b from-teal-800 to-teal-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Compliance</h1>
          <p className="text-white text-lg max-w-3xl mx-auto">
            Learn about our industry standards and compliance requirements for bidding and recruitment professionals.
          </p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-teal-700 mb-6">Industry Standards</h2>
          <p className="text-gray-700 mb-6">
            SNB Alliance is committed to maintaining the highest standards in the bidding and recruitment industry. Our
            certifications are designed to ensure that professionals meet these standards and can demonstrate their
            expertise to employers and clients.
          </p>

          <h2 className="text-2xl font-bold text-teal-700 mb-6 mt-12">Compliance Requirements</h2>
          <p className="text-gray-700 mb-6">
            To maintain your certification with SNB Alliance, you must adhere to our compliance requirements, which
            include continuing education, ethical standards, and professional conduct.
          </p>

          <div className="mt-12">
            <Link href="/learning">
              <Button className="bg-teal-700 hover:bg-teal-800 text-white">Explore Our Learning Programs</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

