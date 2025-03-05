export interface Post {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  date: string
  slug: string
  featured_media: number
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string
      alt_text: string
    }>
  }
}

export interface Page {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  slug: string
  acf?: Record<string, unknown> // Replace `any` with `unknown`
}


export interface MenuItem {
  id: number
  title: string
  url: string
  order: number
  parent: number
  children?: MenuItem[]
}

export interface Certification {
  id: number
  title: string
  shortName: string
  description: string
  forWho: string
}

// Check if WordPress integration should be disabled
const DISABLE_WORDPRESS = process.env.DISABLE_WORDPRESS === "true"

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

// WordPress API base URL
const API_URL = formatWordPressApiUrl(process.env.WORDPRESS_API_URL)
// Menu API URL
const MENU_API_URL = API_URL.replace("/wp/v2", "/menus/v1/menus")

// Add this debug function at the top of the file
function logApiError(endpoint: string, error: unknown) {
  if (error instanceof Error) {
    console.error(`WordPress API Error (${endpoint}):`, error.message, "API URL:", API_URL)
  } else {
    console.error(`WordPress API Error (${endpoint}):`, error, "API URL:", API_URL)
  }
}


/**
 * Check if WordPress API is available
 * This is used to determine if we should try to fetch from WordPress or use fallback data
 */
let isWordPressAvailable: boolean | null = null

async function checkWordPressAvailability(): Promise<boolean> {
  // If we've already checked, return the cached result
  if (isWordPressAvailable !== null) {
    return isWordPressAvailable
  }

  // If WordPress integration is disabled, return false
  if (DISABLE_WORDPRESS) {
    console.log("WordPress integration is disabled by environment variable")
    isWordPressAvailable = false
    return false
  }

  // If API_URL is not defined, return false
  if (!API_URL) {
    console.warn("WORDPRESS_API_URL environment variable is not defined")
    isWordPressAvailable = false
    return false
  }

  try {
    // Add timeout to fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000) // 3 second timeout

    const response = await fetch(`${API_URL}/posts?per_page=1`, {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    })

    clearTimeout(timeoutId)

    isWordPressAvailable = response.ok
    return isWordPressAvailable
  } catch (error) {
    console.warn("WordPress API availability check failed:", error)
    isWordPressAvailable = false
    return false
  }
}

/**
 * Fetch posts from WordPress
 */
export async function getPosts(perPage = 10, page = 1): Promise<Post[]> {
  // Check if WordPress is available
  const wpAvailable = await checkWordPressAvailability()
  if (!wpAvailable) {
    console.log("Using fallback posts data (WordPress API not available)")
    return []
  }

  try {
    // Add timeout to fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    const response = await fetch(`${API_URL}/posts?_embed=wp:featuredmedia&per_page=${perPage}&page=${page}`, {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    logApiError(`getPosts(${perPage}, ${page})`, error)
    return []
  }
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  // Check if WordPress is available
  const wpAvailable = await checkWordPressAvailability()
  if (!wpAvailable) {
    console.log("Using fallback post data (WordPress API not available)")
    return null
  }

  try {
    // Add timeout to fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    const response = await fetch(`${API_URL}/posts?slug=${slug}&_embed=wp:featuredmedia`, {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const posts = await response.json()
    return posts.length > 0 ? posts[0] : null
  } catch (error) {
    logApiError(`getPostBySlug(${slug})`, error)
    return null
  }
}

/**
 * Fetch a page by slug
 */
export async function getPageBySlug(slug: string): Promise<Page | null> {
  // Check if WordPress is available
  const wpAvailable = await checkWordPressAvailability()
  if (!wpAvailable) {
    console.log("Using fallback page data (WordPress API not available)")
    return null
  }

  try {
    // Add timeout to fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    const response = await fetch(`${API_URL}/pages?slug=${slug}`, {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const pages = await response.json()
    return pages.length > 0 ? pages[0] : null
  } catch (error) {
    logApiError(`getPageBySlug(${slug})`, error)
    return null
  }
}

/**
 * Fetch menu items by menu location
 */
export async function getMenuItems(menuId: string): Promise<MenuItem[]> {
  // Default menu items to use as fallback
  const defaultMenuItems = [
    { id: 1, title: "COMPLIANCE", url: "/compliance", order: 1, parent: 0 },
    { id: 2, title: "LEARNING", url: "/learning", order: 2, parent: 0 },
    { id: 3, title: "RESOURCES", url: "/resources", order: 3, parent: 0 },
    { id: 4, title: "ABOUT US", url: "/about-us", order: 4, parent: 0 },
  ]

  // Check if WordPress is available
  const wpAvailable = await checkWordPressAvailability()
  if (!wpAvailable) {
    console.log("Using fallback menu items (WordPress API not available)")
    return defaultMenuItems
  }

  try {
    // Add timeout to fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    const response = await fetch(`${MENU_API_URL}/${menuId}`, {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const menu = await response.json()

    if (!menu || !menu.items || !Array.isArray(menu.items) || menu.items.length === 0) {
      console.warn(`No menu items found for menu ID: ${menuId}. Using default menu.`)
      return defaultMenuItems
    }

    return menu.items
  } catch (error) {
    // Log detailed error information
    logApiError(`getMenuItems(${menuId})`, error)
    console.warn("Falling back to default menu items")
    return defaultMenuItems
  }
}

/**
 * Fetch certifications (custom post type)
 */
export async function getCertifications(): Promise<Certification[]> {
  // Default certifications to use as fallback
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

  // Check if WordPress is available
  const wpAvailable = await checkWordPressAvailability()
  if (!wpAvailable) {
    console.log("Using fallback certifications (WordPress API not available)")
    return defaultCertifications
  }

  try {
    // Add timeout to fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    // Try to fetch custom post type 'certification'
    const response = await fetch(`${API_URL}/certification?per_page=100`, {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    })

    clearTimeout(timeoutId)

    // If custom post type doesn't exist, try to fetch regular posts with category
    if (response.status === 404) {
      console.warn("Certification custom post type not found. Using default certifications.")
      return defaultCertifications
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const certifications = await response.json()

    if (!Array.isArray(certifications) || certifications.length === 0) {
      console.warn("No certifications found. Using default certifications.")
      return defaultCertifications
    }

    // Map WordPress data to our Certification type
    return certifications.map((cert: any) => ({
      id: cert.id,
      title: cert.title?.rendered || "",
      shortName:
        cert.acf?.short_name ||
        cert.title?.rendered
          ?.split(" ")
          .map((word: string) => word[0])
          .join("") ||
        "",
      description: cert.acf?.description || cert.excerpt?.rendered || "",
      forWho: cert.acf?.for_who || "",
    }))
  } catch (error) {
    // Log detailed error information
    logApiError("getCertifications", error)
    console.warn("Falling back to default certifications")
    return defaultCertifications
  }
}

/**
 * Fetch home page data
 */
export async function getHomePageData(): Promise<{
  hero: {
    title: string
    subtitle: string
    buttonText: string
  }
  about: {
    title: string
    content: string
  }
  whyUs: {
    title: string
    items: Array<{
      id: number
      text: string
    }>
  }
}> {
  // Default data to use as fallback
  const defaultData = {
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

  // Check if WordPress is available
  const wpAvailable = await checkWordPressAvailability()
  if (!wpAvailable) {
    console.log("Using fallback home page data (WordPress API not available)")
    return defaultData
  }

  try {
    console.log("Fetching home page data from WordPress API:", API_URL)

    // Add timeout to fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    // Fetch home page data from WordPress
    const response = await fetch(`${API_URL}/pages?slug=home`, {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const pages = await response.json()
    const homePage = pages.length > 0 ? pages[0] : null

    if (!homePage) {
      console.warn("Home page not found in WordPress. Using default data.")
      return defaultData
    }

    // If ACF data is not available, return default data with content from WordPress
    if (!homePage.acf) {
      console.warn("ACF data not found for home page. Using partial default data.")
      return {
        ...defaultData,
        about: {
          ...defaultData.about,
          content: homePage.content?.rendered || defaultData.about.content,
        },
      }
    }

    // Return structured data from ACF fields
    return {
      hero: {
        title: homePage.acf.hero_title || defaultData.hero.title,
        subtitle: homePage.acf.hero_subtitle || defaultData.hero.subtitle,
        buttonText: homePage.acf.hero_button_text || defaultData.hero.buttonText,
      },
      about: {
        title: homePage.acf.about_title || defaultData.about.title,
        content: homePage.acf.about_content || homePage.content?.rendered || defaultData.about.content,
      },
      whyUs: {
        title: homePage.acf.why_us_title || defaultData.whyUs.title,
        items: homePage.acf.why_us_items || defaultData.whyUs.items,
      },
    }
  } catch (error) {
    // Log detailed error information
    logApiError("getHomePageData", error)
    console.warn("Falling back to default home page data")
    return defaultData
  }
}

/**
 * Parse WordPress content to clean HTML
 */
export function parseWordPressContent(content: string): string {
  if (!content) return ""

  // Remove WordPress specific tags and scripts
  const parsed = content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<!--(.|\s)*?-->/g, "")

  return parsed
}

