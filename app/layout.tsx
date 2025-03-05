import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import WordPressDebug from "@/components/wordpress-debug"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SNB Alliance - Empowering Professionals in Bidding & Recruitment",
  description:
    "Join SNB Alliance to become a qualified expert in bidding & recruitment with recognized industry certifications.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* Always show the debug component for now to help troubleshoot */}
        <WordPressDebug />
      </body>
    </html>
  )
}

