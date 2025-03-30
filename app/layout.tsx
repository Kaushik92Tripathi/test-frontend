"use client"

import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { usePathname } from 'next/navigation'
import { AuthProvider } from "@/context/AuthContext"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {!isAdminRoute && <Navbar />}
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}


