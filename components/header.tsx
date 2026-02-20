// Header.jsx
"use client"

import { redirect } from "next/navigation";
export default function Header() {
    return (
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Nav */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-green-400 rounded-lg"></div>
                <span className="text-xl font-bold text-gray-900">Byway</span>
              </div>
              
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-sm text-gray-700 hover:text-gray-900">Categories</a>
              </nav>
            </div>
  
            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="What do you want to learn?"
                  className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
  
            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <a href="#" className="hidden md:block text-sm text-gray-700 hover:text-gray-900">
                Teach on Byway
              </a>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
              <button 
              className="hidden md:block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={()=>redirect("/login")}>
                Log in
              </button>
              <button 
              className="px-4 py-2 text-sm text-white bg-gray-900 hover:bg-gray-800 rounded-lg"
              onClick={()=>redirect("/register")}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }