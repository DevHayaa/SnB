import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { getPosts } from "@/lib/wordpress"
import HomeLoading from "@/components/home-loading"

export default async function BlogPage() {
  // Fetch blog posts from WordPress
  const posts = await getPosts(10, 1)

  return (
    <main className="min-h-screen">
      <Navbar />

      <Suspense fallback={<HomeLoading />}>
        <section className="bg-gradient-to-b from-teal-800 to-teal-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Blog</h1>
            <p className="text-white text-lg max-w-3xl mx-auto">Latest insights, news and updates from SNB Alliance</p>
          </div>
        </section>

        <section className="py-16 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                  {post._embedded?.["wp:featuredmedia"]?.[0] && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={post._embedded["wp:featuredmedia"][0].source_url || "/placeholder.svg"}
                        alt={post._embedded["wp:featuredmedia"][0].alt_text || post.title.rendered}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">
                      <Link href={`/blog/${post.slug}`} className="hover:text-teal-700">
                        {post.title.rendered}
                      </Link>
                    </h2>

                    <div
                      className="text-gray-600 mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</span>

                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="outline" size="sm">
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-medium text-gray-700">No posts found</h3>
                <p className="text-gray-500 mt-2">Check back soon for new content!</p>
              </div>
            )}
          </div>
        </section>
      </Suspense>
    </main>
  )
}

