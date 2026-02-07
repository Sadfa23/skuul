import { useSession } from "next-auth/react"

export function useAuth() {
  const { data: session, status } = useSession()

  return {
    user: session?.user,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    isAdmin: session?.user?.role === "ADMIN",
    isTutor: session?.user?.role === "TUTOR",
    isStudent: session?.user?.role === "STUDENT",
  }
}