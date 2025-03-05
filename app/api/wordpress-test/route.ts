import { NextResponse } from "next/server"

// Format WordPress API URL correctly
function formatWordPressApiUrl(url: string | undefined): string {
  if (!url) {
    return ""
  }

  // Remove trailing slashes
  const formattedUrl = url.trim().replace(/\/+$/, "")

  // Check if the URL already contains '/wp-json/wp/v2'
  if (formattedUrl.includes("/wp-json/wp/v2")) {
    return formattedUrl
  }

  // Check if the URL contains '/wp-json' but not '/wp/v2'
  if (formattedUrl.includes("/wp-json")) {
    return `${formattedUrl}/wp/v2`
  }

  // Add '/wp-json/wp/v2' to the URL
  return `${formattedUrl}/wp-json/wp/v2`
}

export async function GET() {
  // Check if WordPress integration is disabled
  if (process.env.DISABLE_WORDPRESS === "true") {
    return NextResponse.json(
      {
        error: "WordPress integration is disabled by environment variable",
        status: "error",
        disabled: true,
      },
      { status: 200 },
    )
  }

  const wpApiUrl = formatWordPressApiUrl(process.env.WORDPRESS_API_URL)

  if (!wpApiUrl) {
    return NextResponse.json(
      {
        error: "WORDPRESS_API_URL environment variable is not defined",
        status: "error",
        rawUrl: process.env.WORDPRESS_API_URL,
        formattedUrl: wpApiUrl,
      },
      { status: 500 },
    )
  }

  try {
    console.log(`Testing WordPress API connection to: ${wpApiUrl}`)

    // Add timeout to fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    // Test connection to WordPress API
    const response = await fetch(`${wpApiUrl}/posts?per_page=1`, {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `WordPress API returned status: ${response.status}`,
          status: "error",
          rawUrl: process.env.WORDPRESS_API_URL,
          formattedUrl: wpApiUrl,
          responseStatus: response.status,
          responseStatusText: response.statusText,
        },
        { status: response.status },
      )
    }

    // Try to parse the response
    const data = await response.json()

    return NextResponse.json({
      message: "WordPress API connection successful",
      status: "success",
      rawUrl: process.env.WORDPRESS_API_URL,
      formattedUrl: wpApiUrl,
      data: Array.isArray(data) ? { count: data.length } : data,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        status: "error",
        rawUrl: process.env.WORDPRESS_API_URL,
        formattedUrl: wpApiUrl,
      },
      { status: 500 },
    )
  }
}

