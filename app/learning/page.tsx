import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"

export default function LearningPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="bg-gradient-to-b from-teal-800 to-teal-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Learning Programs</h1>
          <p className="text-white text-lg max-w-3xl mx-auto">
            Discover our comprehensive learning programs designed to help you excel in bidding and recruitment.
          </p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-teal-700 mb-4">Individual Learning Paths</h2>
            <p className="text-gray-700 mb-6">
              Our individual learning paths are designed to help you progress from beginner to expert in bidding and
              recruitment. Each path includes a series of courses, workshops, and assessments to ensure you develop the
              skills you need.
            </p>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">Explore Individual Paths</Button>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-teal-700 mb-4">Corporate Training</h2>
            <p className="text-gray-700 mb-6">
              Our corporate training programs are tailored to meet the specific needs of your organization. We work with
              you to develop a customized learning plan that addresses your unique challenges and goals.
            </p>
            <Button className="bg-teal-700 hover:bg-teal-800 text-white">Learn About Corporate Training</Button>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-teal-700 mb-6">Upcoming Workshops & Webinars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="text-yellow-500 font-bold mb-2">March 15, 2025</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Advanced Bidding Strategies</h3>
                <p className="text-gray-700 mb-4">
                  Learn advanced techniques for successful bidding in competitive markets.
                </p>
                <Button variant="outline" className="w-full">
                  Register Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

