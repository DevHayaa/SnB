"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function WordPressDebug() {
  const [isOpen, setIsOpen] = useState(false)
  const [apiStatus, setApiStatus] = useState<{
    url: string
    status: "loading" | "success" | "error"
    message: string
    details?: string
  } | null>(null)
  const [wpApiUrl, setWpApiUrl] = useState("")
  const [wpDisabled, setWpDisabled] = useState(false)

  useEffect(() => {
    // Get WordPress API URL and disabled status
    setWpApiUrl(process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "Not configured")
    setWpDisabled(process.env.NEXT_PUBLIC_DISABLE_WORDPRESS === "true")
  }, [])

  const formatApiUrl = (url: string): string => {
    if (!url || url === "Not configured") return url

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

  const checkApiConnection = async () => {
    setApiStatus({
      url: wpApiUrl,
      status: "loading",
      message: "Testing connection...",
    })

    try {
      // Try to fetch from WordPress API test endpoint
      const response = await fetch("/api/wordpress-test")

      const data = await response.json()

      if (response.ok && data.status === "success") {
        setApiStatus({
          url: wpApiUrl,
          status: "success",
          message: "Connection successful! WordPress API is accessible.",
          details: `API URL: ${formatApiUrl(wpApiUrl)}`,
        })
      } else {
        setApiStatus({
          url: wpApiUrl,
          status: "error",
          message: `API Error: ${data.error || response.statusText}`,
          details: `API URL: ${formatApiUrl(wpApiUrl)}`,
        })
      }
    } catch (error) {
      setApiStatus({
        url: wpApiUrl,
        status: "error",
        message: `Connection failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        details: `API URL: ${formatApiUrl(wpApiUrl)}`,
      })
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`${wpDisabled ? "bg-gray-500" : "bg-gray-800 hover:bg-gray-700"} text-white`}
      >
        WP {wpDisabled ? "Disabled" : "Debug"}
      </Button>

      {isOpen && (
        <div className="absolute bottom-12 right-0 w-96 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-lg font-bold mb-2">WordPress API Debug</h3>

          {wpDisabled ? (
            <div className="bg-yellow-100 text-yellow-800 p-3 rounded mb-4">
              WordPress integration is currently disabled by the DISABLE_WORDPRESS environment variable.
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">WordPress URL:</p>
                <p className="text-sm font-mono bg-gray-100 p-1 rounded break-all">{wpApiUrl}</p>
                <p className="text-sm text-gray-600 mt-2 mb-1">Formatted API URL:</p>
                <p className="text-sm font-mono bg-gray-100 p-1 rounded break-all">{formatApiUrl(wpApiUrl)}</p>
              </div>

              <Button onClick={checkApiConnection} className="w-full mb-2" disabled={apiStatus?.status === "loading"}>
                Test API Connection
              </Button>

              {apiStatus && (
                <div
                  className={`mt-2 p-2 rounded text-sm ${
                    apiStatus.status === "success"
                      ? "bg-green-100 text-green-800"
                      : apiStatus.status === "error"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                  }`}
                >
                  <p>{apiStatus.message}</p>
                  {apiStatus.details && <p className="mt-1 font-mono text-xs break-all">{apiStatus.details}</p>}
                </div>
              )}
            </>
          )}

          <div className="mt-4 text-xs text-gray-500">
            <p>Troubleshooting tips:</p>
            <ul className="list-disc pl-4 mt-1">
              <li>WordPress API URL should point to your WordPress site</li>
              <li>
                The API endpoint should be <code>/wp-json/wp/v2</code>
              </li>
              <li>
                Example: <code>https://your-site.com/wp-json/wp/v2</code>
              </li>
              <li>Ensure WordPress has REST API enabled</li>
              <li>Check that WordPress has proper CORS headers</li>
              <li>
                To disable WordPress integration, set <code>DISABLE_WORDPRESS=true</code>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

