// SignupPage.jsx
"use client"
import Image from "next/image";
import Link from "next/link";
import GoogleLoginButton from "../login/loginPageButton";
import { useForm } from "react-hook-form";
import { signupInputSchema, UserAuthInput } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {

  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuthInput>({
    resolver: zodResolver(signupInputSchema),
    defaultValues: {
      role: "STUDENT",
      provider: "credentials",
    },
  });

  const onSubmit = async (data: UserAuthInput) => {
    setIsLoading(true);
    setServerError(null);

    try {
      console.log("The button is clickeked")
      const res = await axios.post("/api/auth/register", data)
      console.log("Logged in successfully", res)
      router.push("/redirect")
  
      if (res.status !== 200 || 201) {
        throw new Error("Auto-login failed")
      } 
      
    } catch (error: any) {
      setServerError(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image */}
            <div className="hidden lg:block">
              <div className="relative">
                <Image 
                  src="/students-learning.jpg" 
                  width={500}
                  height={500}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  alt="Student studying"
                  className="shadow-2xl w-full h-auto object-cover"
                />
              </div>
            </div>
  
            {/* Right Side - Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Create Your Account
                </h2>
  
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                  {/* Full Name */}
                  <div>
                    <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-2">
                      First name
                    </label>
                    <input
                      {...register("firstname")}
                      type="text"
                      id="firstname"
                      placeholder="Full Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
  
                  {/* Username */}
                  <div>
                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-2">
                      Last name
                    </label>
                    <input
                      {...register("lastname")}
                      type="text"
                      id="lastname"
                      placeholder="Username"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      id="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  {/* Role */}
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      {...register("role")}
                      id="role"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white appearance-none cursor-pointer"
                    >
                      <option value="">Select a role</option>
                      <option value="STUDENT">Student</option>
                      <option value="TUTOR">Tutor</option>
                    </select>
                  </div>
  
                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      {...register("password")}
                      type="password"
                      id="password"
                      placeholder="Enter Password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
  
                  {/* Create Account Button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Create Account
                  </button>
  
                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">Or</span>
                    </div>
                  </div>
  
                  {/* Social Login Buttons */}
                  <div>
                    {/* Google */}
                    <GoogleLoginButton/>
                  </div>
  
                  {/* Sign In Link */}
                  <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                      Log In
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }