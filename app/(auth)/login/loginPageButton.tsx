"use client"

import { signIn } from "next-auth/react"

export default function GoogleLoginButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/redirect" })}
      className="w-full border p-2 rounded"
    >
      Continue with Google
    </button>
  )
}