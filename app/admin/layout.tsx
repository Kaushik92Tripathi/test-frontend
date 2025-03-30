"use client"

import AdminNavbar from "@/components/AdminNavbar"
import AdminMiddleware from "@/components/middleware/AdminMiddleware"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminMiddleware>
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <main className="py-6">
          {children}
        </main>
      </div>
    </AdminMiddleware>
  )
} 