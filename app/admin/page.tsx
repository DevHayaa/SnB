"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"

export default function AdminPage() {
  const [wpAdminUrl, setWpAdminUrl] = useState("")

  useEffect(() => {
    // Get WordPress admin URL from environment variable or use a default
    const adminUrl = process.env.NEXT_PUBLIC_WORDPRESS_ADMIN_URL || "http://localhost/wordpress/wp-admin"
    setWpAdminUrl(adminUrl)
  }, [])

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="bg-gradient-to-b from-teal-800 to-teal-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Admin Dashboard</h1>
          <p className="text-white text-lg max-w-3xl mx-auto">Manage your SNB Alliance website content</p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-teal-700 mb-6">Content Management</h2>

          <div className="grid gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">WordPress Admin</h3>
              <p className="text-gray-600 mb-4">
                Access your WordPress admin panel to manage all content, including pages, posts, certifications, and
                media.
              </p>
              <a href={wpAdminUrl} target="_blank" rel="noopener noreferrer">
                <Button className="bg-teal-700 hover:bg-teal-800 text-white">Go to WordPress Admin</Button>
              </a>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Quick Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href={`${wpAdminUrl}/post-new.php`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full">
                    Create New Post
                  </Button>
                </a>
                <a href={`${wpAdminUrl}/post-new.php?post_type=page`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full">
                    Create New Page
                  </Button>
                </a>
                <a href={`${wpAdminUrl}/upload.php`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full">
                    Media Library
                  </Button>
                </a>
                <a href={`${wpAdminUrl}/edit.php?post_type=certification`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full">
                    Manage Certifications
                  </Button>
                </a>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Website Preview</h3>
              <p className="text-gray-600 mb-4">View your website to see how your content appears to visitors.</p>
              <Link href="/">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">View Website</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

