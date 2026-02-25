"use client"

import Sidebar from "@/components/dashboardComponents/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 bg-gray-100 p-6 md:p-10">
        {children}
      </main>
    </div>
  )
}