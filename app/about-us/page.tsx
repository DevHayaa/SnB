import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"

export default function AboutUsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="bg-gradient-to-b from-teal-800 to-teal-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">About SNB Alliance</h1>
          <p className="text-white text-lg max-w-3xl mx-auto">
            Learn about our mission, vision, and the team behind SNB Alliance.
          </p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-teal-700 mb-6">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              At SNB Alliance, our mission is to empower professionals in the bidding and recruitment industry through
              education, certification, and community. We believe that by raising the standards of professionals in this
              field, we can improve outcomes for businesses and individuals alike.
            </p>

            <h2 className="text-2xl font-bold text-teal-700 mb-6 mt-12">Our Vision</h2>
            <p className="text-gray-700 mb-6">
              Our vision is to create a global community of certified bidding and recruitment professionals who are
              recognized for their expertise, integrity, and commitment to excellence. We aim to be the leading
              authority in bidding and recruitment education and certification worldwide.
            </p>
          </div>

          <div>
            <Image
              src=""
              alt="SNB Alliance Team"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                  <Image
                    src=""
                    alt="Team Member"
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">John Doe</h3>
                <p className="text-teal-700 font-medium mb-3">Founder & CEO</p>
                <p className="text-gray-700 text-sm">
                  With over 15 years of experience in bidding and recruitment, John founded SNB Alliance to help
                  professionals excel in this field.
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 text-lg">
              Join SNB Alliance Today
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}

