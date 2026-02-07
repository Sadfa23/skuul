// app/register/page.tsx
"use client"
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { signupInputSchema, UserAuthInput } from "@/types/auth.types";

export default function RegisterPage() {
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

    console.log(data)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""; 
      const response = await axios.post(`${apiUrl}/api/auth/register`, data);
      console.log("Registration successful:", response.data);
      // Redirect or show success message here
    } catch (error: any) {
      setServerError(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-sm bg-white">
      <h1 className="text-2xl font-bold mb-6">Create an Account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            {...register("firstname")}
            className="w-full p-2 border rounded mt-1"
            placeholder="John"
          />
          {errors.firstname && (
            <p className="text-red-500 text-xs mt-1">{errors.firstname.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input
            {...register("lastname")}
            className="w-full p-2 border rounded mt-1"
            placeholder="Doe"
          />
          {errors.lastname && (
            <p className="text-red-500 text-xs mt-1">{errors.lastname.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full p-2 border rounded mt-1"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            {...register("password")}
            type="password"
            className="w-full p-2 border rounded mt-1"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium">I am a...</label>
          <select
            {...register("role")}
            className="w-full p-2 border rounded mt-1 bg-white"
          >
            <option value="STUDENT">STUDENT</option>
            <option value="TUTOR">TUTOR</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
          )}
        </div>

        {/* Server Error Message */}
        {serverError && (
          <div className="p-3 bg-red-100 text-red-700 rounded text-sm">
            {serverError}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
        >
          {isLoading ? "Registering..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}