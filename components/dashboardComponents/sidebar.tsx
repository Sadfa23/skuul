"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  LayoutDashboard,
  GraduationCap,
  MessageCircle,
  CircleDollarSign,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react"

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Courses", icon: GraduationCap, href: "/dashboard/courses" },
  { name: "Communication", icon: MessageCircle, href: "/dashboard/communication" },
  { name: "Revenue", icon: CircleDollarSign, href: "/dashboard/revenue" },
  { name: "Setting", icon: Settings, href: "/dashboard/settings" },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <aside
      className={`
        ${collapsed ? "w-20" : "w-64"}
        bg-[rgb(var(--sidebar-bg))]
        text-white
        flex flex-col
        justify-between
        shadow-xl
        transition-all duration-300
      `}
    >
      {/* TOP */}
      <div>
        {/* Header */}
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          } px-4 py-5`}
        >
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-sky-400 to-green-400" />
              <span className="text-lg font-semibold">Byway</span>
            </div>
          )}

          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? (
              <ChevronRight className="h-5 w-5 text-gray-300" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-gray-300" />
            )}
          </button>
        </div>

        {/* MENU */}
        <nav className="mt-6 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link href={item.href} key={index}>
                <div
                  className={`
                    relative flex items-center
                    ${collapsed ? "justify-center px-0" : "gap-4 px-6"}
                    py-3 cursor-pointer transition-all
                    ${
                      isActive
                        ? "text-blue-500"
                        : "text-gray-300 hover:text-white"
                    }
                  `}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r-md" />
                  )}

                  <Icon className="h-5 w-5 shrink-0" />

                  {!collapsed && (
                    <span className="text-sm font-medium">
                      {item.name}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* FOOTER */}
      <div
        className={`border-t border-white/10 py-5 ${
          collapsed ? "flex justify-center" : "px-6"
        }`}
      >
        {collapsed ? (
          <img
            src="https://i.pravatar.cc/40"
            className="h-9 w-9 rounded-full"
          />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/40"
                className="h-9 w-9 rounded-full"
              />
              <span className="text-sm text-gray-200">
                Hi, John
              </span>
            </div>
            <Menu className="h-5 w-5 text-gray-300" />
          </div>
        )}
      </div>
    </aside>
  )
}