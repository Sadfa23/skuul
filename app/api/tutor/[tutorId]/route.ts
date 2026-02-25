import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

// This is a route for getting tutosr infgo

export async function GET(req: NextRequest, {params}:{params: Promise<{tutorId: string}>}) {
    try {
        const {tutorId} = await params
        /*
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "TUTOR") {
            return NextResponse.json({
                message: "Unauthorized",
            })
        }
        */
        const tutorsCourses = await prisma.course.findMany({
            where: {
                tutorId: tutorId
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