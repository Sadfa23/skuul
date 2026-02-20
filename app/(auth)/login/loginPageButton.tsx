"use client"

import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"

export default function GoogleLoginButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/redirect" })}
      className="
        w-full
        flex items-center justify-center gap-3
        border border-gray-300
        bg-white
        py-2.5 px-4
        rounded-lg
        text-sm font-medium text-gray-700
        shadow-sm
        hover:bg-gray-50
        transition
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
      "
    >
      <FcGoogle size={20} />
      <span>Continue with Google</span>
    </button>
  )
}