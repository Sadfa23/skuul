import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/auth";

export default async function RoleRedirect() {
    const session = await getServerSession(authOptions) 
    if (!session) redirect("/login")
    const role = session.user.role

    if (!role) {
        redirect("/usertype")
    }
    
    if (role==="ADMIN") {
        redirect("/admin")
    }
    if (role==="STUDENT") {
        redirect("/student")
    }
    if (role==="TUTOR") {
        redirect("/tutor")
    }
    
}