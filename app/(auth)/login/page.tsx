// app/login/page.tsx
"use client"

import React, {useState} from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import z from "zod"
import axios from "axios"
import { loginInputSchema, type UserLoginInput } from "@/types/auth.types"
import { register } from "module"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import GoogleLoginButton from "./loginPageButton"

export default function LoginPage() {

    const router = useRouter()
    const [serverError, setServerError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<UserLoginInput>({
        resolver: zodResolver(loginInputSchema),
      });

      const onSubmit = async (data: UserLoginInput) => {
         const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
         })

         if(res?.error) {
            setServerError("Invalid credentials")
            console.log(res.error)
            return
         }

         router.push("/redirect")
      };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                placeholder="you@example.com"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password")}
                placeholder="••••••••"
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            <GoogleLoginButton/>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          Don’t have an account? <Link href="/register" className="underline">Register</Link>
        </CardFooter>
      </Card>
    </div>
  )
}
