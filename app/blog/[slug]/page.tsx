import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { getPostBySlug, parseWordPressContent } from "@/lib/wordpress"
import HomeLoading from "@/components/home-loading"

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Fetch blog post from WordPress
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <Suspense fallback={<HomeLoading />}>
        {post._embedded?.["wp:featuredmedia"]?.[0] && (
          <div className="relative h-64 md:h-96 w-full">
            <Image
              src={post._embedded["wp:featuredmedia"][0].source_url || "/placeholder.svg"}
              alt={post._embedded["wp:featuredmedia"][0].alt_text || post.title.rendered}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white text-center px-4">{post.title.rendered}</h1>
            </div>
          </div>
        )}

        {!post._embedded?.["wp:featuredmedia"]?.[0] && (
          <section className="bg-gradient-to-b from-teal-800 to-teal-600 py-16">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">{post.title.rendered}</h1>
            </div>
          </section>
        )}

        <section className="py-16 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8 text-sm text-gray-500">
              <span>Published: {new Date(post.date).toLocaleDateString()}</span>
              <Link href="/blog">
                <Button variant="outline" size="sm">
                  Back to Blog
                </Button>
              </Link>
            </div>

            <article className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: parseWordPressContent(post.content.rendered) }} />
            </article>
          </div>
        </section>
      </Suspense>
    </main>
  )
}

