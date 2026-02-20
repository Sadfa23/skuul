// LoginPage.jsx
"use client"

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { loginInputSchema, UserLoginInput } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import GoogleLoginButton from "./loginPageButton";

export default function LoginPage() {
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<UserLoginInput>({
        resolver: zodResolver(loginInputSchema)
    })

    const onSubmit = async (data: UserLoginInput) => {
             const res = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false
             })
    
             if(res?.error) {
                setError("Invalid credentials")
                console.log(res.error)
                return
             }
    
             redirect("/redirect")
          };
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
        {/* Header */}
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
                    placeholder="Search courses"
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
                <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                  Log in
                </button>
                <button className="px-4 py-2 text-sm text-white bg-gray-900 hover:bg-gray-800 rounded-lg">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </header>
  
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-2 items-center">
            {/* Left Side - Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0 order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-xl p-2 md:p-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Sign in to your account
                </h2>
  
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      placeholder="Example@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
  
                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      {...register("password")}
                      placeholder="Enter Password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
  
                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Remember Me</span>
                    </label>
                    <Link href="#" className="text-sm text-blue-600 hover:text-blue-700">
                      Forgot Password?
                    </Link>
                  </div>
  
                  {/* Sign In Button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Sign In
                  </button>
  
                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or</span>
                    </div>
                  </div>
  
                  {/* Social Login Buttons */}
                  <div className="">
  
                    {/* Google */}
                    <GoogleLoginButton/>
                  </div>
  
                  {/* Sign Up Link */}
                  <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                      Sign Up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
  
            {/* Right Side - Image */}
            <div className="hidden lg:block order-1 lg:order-2">
              <div className="relative">
                <Image 
                  src="/students-learning.jpg" 
                  alt="Students studying"
                  width={500}
                  height={500}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="shadow-2xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }