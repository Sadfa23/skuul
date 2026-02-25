"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { enrollInCourse } from "@/app/(actions)/student.actions"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

export default function EnrollButton({ courseId }: { courseId: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleEnroll() {
    setStatus("loading")
    const result = await enrollInCourse(courseId)
    console.log("Enrollment data", result)

    if (result.success) {
      setStatus("success")
      setMessage(result.message)
    } else {
      setStatus("error")
      setMessage(result.error)
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
        <CheckCircle className="h-4 w-4" />
        {message}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <Button
        onClick={handleEnroll}
        disabled={status === "loading"}
        className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold h-11"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Enrolling...
          </>
        ) : (
          "Enroll Now"
        )}
      </Button>

      {status === "error" && (
        <p className="flex items-center gap-1.5 text-red-400 text-xs">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {message}
        </p>
      )}
    </div>
  )
}