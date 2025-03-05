import { NextResponse } from "next/server"
import { getPosts, getPostBySlug, getPageBySlug, getCertifications, getHomePageData } from "@/lib/wordpress"

// API route to fetch posts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const slug = searchParams.get("slug")
  const page = searchParams.get("page") || "1"
  const perPage = searchParams.get("per_page") || "10"

  try {
    let data

    switch (type) {
      case "posts":
        data = await getPosts(Number(perPage), Number(page))
        break
      case "post":
        if (!slug) {
          return NextResponse.json({ error: "Slug is required" }, { status: 400 })
        }
        data = await getPostBySlug(slug)
        break
      case "page":
        if (!slug) {
          return NextResponse.json({ error: "Slug is required" }, { status: 400 })
        }
        data = await getPageBySlug(slug)
        break
      case "certifications":
        data = await getCertifications()
        break
      case "home":
        data = await getHomePageData()
        break
      default:
        return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}

