import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

// Teacher's Panel Code
// Get all courses created by a teacher
export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "TUTOR") {
            return NextResponse.json({
                message: "Unauthorized",
            })
        }
        const tutorsCourses = await prisma.course.findMany({
            where: {
                tutorId: session.user.id
            }
        })

        return NextResponse.json({
            success: true,
            tutorsCourses
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        })
    }
}