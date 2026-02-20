// CTASections.jsx
import Image from "next/image";
export default function CTASections() {
    return (
      <section className="bg-gradient-to-br from-pink-50 via-white to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Become an Instructor */}
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Become an Instructor
                </h2>
                <p className="text-gray-600 mb-6">
                  Instructors from around the world teach millions of students on Byway. We provide the tools and skills to teach what you love.
                </p>
                <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
                  Start Your Instructor Journey
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
              <div className="order-1 md:order-2">
                <div className="w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-purple-200 to-purple-400 overflow-hidden">
                  <Image src="/pexels-raul-sotomayor-2154397849-33265585.jpg" width={300} height={300} alt="Instructor" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
  
          {/* Transform Your Life */}
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-2 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Transform your life through education
                </h2>
                <p className="text-gray-600 mb-6">
                  Learners around the world are launching new careers, advancing in their fields, and enriching their lives.
                </p>
                <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                  Checkout Courses
                </button>
              </div>
              <div className="order-1 md:order-1">
                <div className="w-64 h-64 mx-auto rounded-3xl bg-gradient-to-br from-blue-200 to-blue-400 overflow-hidden">
                  <Image src="/pexels-hai-nguyen-825252-1699419.jpg" width={300} height={300} alt="Student" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }