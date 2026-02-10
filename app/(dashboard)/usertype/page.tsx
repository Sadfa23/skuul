"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function UserTypePage() {
  const { data: session } = useSession()
  const router = useRouter()

  async function selectRole(role: "ADMIN" | "STUDENT" | "TUTOR") {
    await fetch("/api/user/role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    })

    router.push("/redirect")
  }

  return (
    <div className="space-y-4">
      <h1>Select your role</h1>

      <button onClick={() => selectRole("STUDENT")}>Student</button>
      <button onClick={() => selectRole("TUTOR")}>Tutor</button>
      <button onClick={() => selectRole("ADMIN")}>Admin</button>
    </div>
  )
}