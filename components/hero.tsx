// HeroSection.jsx
"use client"
import Image from "next/image";
import { redirect } from "next/navigation";
export default function HeroSection() {
  
    return (
      <section className="bg-gradient-to-br from-pink-50 via-white to-blue-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Unlock Your Potential with Byway
              </h1>
              <p className="text-gray-600 text-lg">
                Welcome to Byway, where learning knows no bounds. We believe that education is the key to personal and professional growth, and we're here to guide you on your journey to success.
              </p>
              <button 
              onClick={()=> redirect("/login")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Start your instructor journey
              </button>
            </div>
  
            {/* Right Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Top Image */}
                <div className="col-span-2 flex justify-end">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 overflow-hidden border-4 border-white shadow-lg">
                    <Image src="/pexels-hai-nguyen-825252-1699419.jpg" width={200} height={200} alt="Student" className="w-full h-full object-cover" />
                  </div>
                </div>
                
                {/* Bottom Left Image */}
                <div className="flex justify-start">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-red-300 to-red-500 overflow-hidden border-4 border-white shadow-lg">
                    <img src="/pexels-hai-nguyen-825252-1699419.jpg" width={160} height={160} alt="Student" className="w-full h-full object-cover" />
                  </div>
                </div>
                
                {/* Bottom Right Image */}
                <div className="flex justify-end items-end">
                  <div className="w-36 h-36 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 overflow-hidden border-4 border-white shadow-lg">
                    <img src="/pexels-hai-nguyen-825252-1699419.jpg" width={144} height={144} alt="Student" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              
              {/* Play Button */}
              <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }