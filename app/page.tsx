import { Suspense } from "react"
import Image from "next/image"
import { Book, Building, Check } from "lucide-react"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { getHomePageData, getCertifications, parseWordPressContent } from "@/lib/wordpress"
import HomeLoading from "@/components/home-loading"
import { Certificate } from "crypto"

// Update the Home component to handle errors better
export default async function Home() {
  console.log("Fetching WordPress data...")

  // Fetch data with error handling
  let homeData
  interface Certification {
    id: number
    title: string
    shortName: string
    description: string
    forWho: string
  }
  
  let certifications: Certification[]

  try {
    // Fetch home page data
    homeData = await getHomePageData()
    console.log("Home data fetched successfully")
  } catch (error) {
    console.error("Error in page component while fetching home data:", error)
    // Set default data if fetch fails
    homeData = {
      hero: {
        title: "EMPOWERING PROFESSIONALS IN BIDDING & RECRUITMENT",
        subtitle:
          "Join SNB Alliance to become a qualified expert in bidding & recruitment with recognized industry certifications.",
        buttonText: "JOIN NOW",
      },
      about: {
        title: "What is SNB ALLIANCE?",
        content:
          "<p>We are a team dedicated to train the educated people and provide them with a detailed structure to cover the bidding & recruitment industry.</p><p>The intellectual property and products behind this idea are the founding body of this alliance who identified the gap between the bidding and recruiting management and brokers.</p><p><strong>We aspire that the recruiters & proposal writers be considered as the qualified ones.</strong></p><p>The key idea is to bring the two ends of roles so that they can work peacefully.</p>",
      },
      whyUs: {
        title: "Why Us?",
        items: [
          {
            id: 1,
            text: "Increase the industrial awareness and expand the tactics of bidding, recruitment, and proposals.",
          },
          { id: 2, text: "Exams are methodized to assess the skill sets before awarding the certificates." },
          { id: 3, text: "New members are always welcomed and they are enlightened by the senior members & mentors." },
          { id: 4, text: "Your career soars with each session and ultimately you evolve into a global leader." },
          {
            id: 5,
            text: "SNB Alliance is an advanced platform where professional achievers help other professionals to reach their goals.",
          },
        ],
      },
    }
  }

  try {
    // Fetch certifications
    certifications = await getCertifications()
    console.log("Certifications fetched successfully")
  } catch (error) {
    console.error("Error in page component while fetching certifications:", error)
    // Set default certifications if fetch fails
    certifications = []
  }

  // Use default certifications if API fails
  const defaultCertifications = [
    {
      id: 1,
      title: "Certificate in Bidding & Staffing Associate",
      shortName: "CSBA",
      description:
        "This foundational certification equips you with the basic understanding of bidding and recruitment processes. It's perfect for individuals new to the industry who are looking to build a strong foundation.",
      forWho: "Anyone can join",
    },
    {
      id: 2,
      title: "Certificate in Bid & Man-power Professional",
      shortName: "CBMP",
      description:
        "Aimed at individuals who want to use bidding and staffing strategies to advance their careers. Builds on the CSBA, offering deeper knowledge and practical skills while opening doors to new opportunities.",
      forWho: "Proposal writers",
    },
    {
      id: 3,
      title: "Certified Staffing Management Professional",
      shortName: "CSMP",
      description:
        "Designed for resource managers, this certification enhances your skills in managing staffing operations using efficient management of all customer processes and terms.",
      forWho: "Resource manager",
    },
    {
      id: 4,
      title: "Certified Staffing And Bidding Leader",
      shortName: "CSBL",
      description:
        "This advanced certification is tailored for professionals in leadership roles. Master the strategic aspects of staffing and bidding operations. Learn to create and manage teams while driving growth.",
      forWho:
        "Operational Manager (OM), General Manager (GM), Director Consulting (DC), Account Executive (AE), Business Development Manager (BD), Director (D)",
    },
  ]

  const displayCertifications = certifications.length > 0 ? certifications : defaultCertifications

  return (
    <main className="min-h-screen">
      <Navbar />

      <Suspense fallback={<HomeLoading />}>
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden bg-teal-600">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/homeBanner.png')" }}
        ></div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-[#f8a02e] mb-4">
          EMPOWERING PROFESSIONALS IN <br /> BIDDING & RECRUITMENT
          </h1>
          <p className="text-white text-lg md:text-xl max-w-3xl mx-auto mb-8">
            {homeData.hero.subtitle}
          </p>
          <Button className="bg-[#f8a02e] hover:bg-yellow-600 text-black font-bold px-8 py-3 text-lg rounded">
            {homeData.hero.buttonText}
          </Button>
        </div>
      </section>

        {/* What is SNB Alliance Section */}
        <section className="py-16 container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left Side - Images */}
            <div className="md:w-1/2 flex justify-center relative">
                {/* Main Large Image */}
                <div className="">
                    <img
                        src="/about.png"
                        alt="SNB Alliance Team"
                        height={450}
                        className="max-w-[900px]"
                    />
                </div>
            </div>

            {/* Right Side - Text Content */}
            <div className="md:w-1/2">
                <h2 className="text-4xl font-bold text-teal-700 mb-6">
                    {homeData.about.title}
                </h2>
                <div
                    className="text-gray-700 text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: parseWordPressContent(homeData.about.content) }}
                />
            </div>
        </div>
    </section>



        {/* Why Us Section */}
        <section className="bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold text-teal-700 mb-8">{homeData.whyUs.title}</h2>
                <div className="space-y-6">
                  {homeData.whyUs.items.map((item) => (
                    <div key={item.id} className="flex items-start gap-4">
                      <div className="bg-teal-100 p-2 rounded-full">
                        <Check className="h-5 w-5 text-teal-700" />
                      </div>
                      <p className="text-gray-700">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:w-1/3">
                <Image
                  src="/whyus.png"
                  alt="Professional Woman"
                  width={300}
                  height={400}
                  className=""
                />
              </div>
            </div>
          </div>
        </section>

        {/* Certification Pathways */}
        <section className="py-16 mx-auto px-4 bg-[#39a3b1]">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-white text-center mb-12">Certification Pathways</h2>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCertifications.map((cert) => (
            <div key={cert.id} className="text-white overflow-hidden border-r last:border-r-0 border-gray-300 flex flex-col">
              {/* Title Background */}
              <div className="p-6 text-center">
                <h3 className="font-bold text-lg">{cert.shortName}</h3>
                <p className="text-sm">({cert.title})</p>
              </div>

              {/* Description Section */}
              <div className="p-6 flex-grow">
                <p className="text-sm">{cert.description}</p>
              </div>

              {/* Centered Button */}
              <div className="p-4 bg-[#f8a02e] text-center hover:bg-yellow-600 transition mt-auto mx-auto w-3/4">
                <button className="text-black font-bold flex items-center justify-center w-full gap-2">
                  Explore More <span>➡️</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>



        {/* Learning & Training */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold text-teal-700 text-center mb-12">Learning & Training</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#f8a02e] rounded-lg p-8 h-full w-4/5 md:w-3/4 lg:w-2/3 mx-auto flex flex-col"   style={{ borderBottomRightRadius: "100px", borderTopLeftRadius: "100px" }}
            >
              <h3 className="text-2xl font-bold text-white mb-4 text-center">For Individuals</h3>
              <p className="text-white mb-6">
                Structured learning programs specifically designed to help you thrive in the bidding and recruitment
                industries. Whether you're a novice or an expert, our courses provide the knowledge and skills you need.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full">
                    {/* <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" fill="white" />
                      <path d="M12 6V18" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                      <path d="M6 12H18" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                    </svg> */}
                    <Book className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Self-Paced Study:</h4>
                    <p className="text-sm text-white">Learn at your own pace with access to comprehensive materials.</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full">
                    {/* <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" fill="white" />
                      <path d="M12 6V18" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                      <path d="M6 12H18" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                    </svg> */}
                    <Building className="text-white"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Instructor-Led Training:</h4>
                    <p className="text-sm text-white">Interactive, expert-led sessions for hands-on learning.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-book-open-check text-white"><path d="M12 21V7"/><path d="m16 12 2 2 4-4"/><path d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3"/></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Mock Exams:</h4>
                    <p className="text-sm text-white">
                      Prepare for certification exams with practice tests that mimic the real thing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#39a3b1] rounded-lg p-8 h-full w-4/5 md:w-3/4 lg:w-2/3 mx-auto flex flex-col"   style={{ borderBottomRightRadius: "100px", borderTopLeftRadius: "100px" }}
            >
              <h3 className="text-2xl font-bold text-white mb-4 text-center">For Businesses</h3>
              <p className="text-white mb-6">
                Empower your team with tailored training solutions that align with your business's needs.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-presentation text-white"><path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Customizable Corporate Training:</h4>
                    <p className="text-sm text-white">Programs designed specifically for your team's needs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className=" p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shield-check text-white"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Team Certification Packages:</h4>
                    <p className="text-sm text-white">Streamlined solutions to certify your entire team at once.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-lightbulb text-white"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Compliance Solutions:</h4>
                    <p className="text-sm text-white">Ensure your business complies with industry standards and best practices and regulations.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Guidelines */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-teal-700 text-center mb-12">Learning Guidelines</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <table className="w-full">
                <thead className="bg-teal-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-teal-700">Prerequisite CSBA</th>
                    <th className="py-3 px-4 text-left text-teal-700"></th>
                    <th className="py-3 px-4 text-left text-teal-700"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4"></td>
                    <td className="py-3 px-4 font-semibold">CSBA</td>
                    <td className="py-3 px-4">Anyone can join</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4">Prerequisite CSBA</td>
                    <td className="py-3 px-4 font-semibold">CBMP</td>
                    <td className="py-3 px-4">Proposal writers</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4">Prerequisite CSBA</td>
                    <td className="py-3 px-4 font-semibold">CSMP</td>
                    <td className="py-3 px-4">Resource manager</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4">Prerequisite CSBA</td>
                    <td className="py-3 px-4 font-semibold">CSBL</td>
                    <td className="py-3 px-4">
                      Operational Manager (OM)
                      <br />
                      General Manager (GM)
                      <br />
                      Director Consulting (DC)
                      <br />
                      Account Executive (AE)
                      <br />
                      Business Development Manager (BD)
                      <br />
                      Director (D)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-8 container mx-auto px-4 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[#f8a02e] hover:bg-yellow-600 text-black font-bold px-8 py-3 text-lg rounded">
              Workshops & Webinars
            </Button>
            <Button className="bg-[#39a3b1] hover:bg-[#39a3b1] text-white font-bold px-8 py-3 text-lg rounded">
              Explore Learning Programs
            </Button>
          </div>
        </section>
      </Suspense>
    </main>
  )
}

