import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
// Teacher creating a course
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "TUTOR") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }
        const {
             course_name,
             description,
             level,
             prerequisites,
             price,
             video_secure_url,
             image_secure_url} = await req.json()

             console.log(price)
        const newCourse = await prisma.course.create({
            data: {
                tutorId: session.user.id,
                course_name: course_name,
                description: description,
                course_level: level,
                price: price,
                intro_video: video_secure_url,
                prerequisites: prerequisites,
                banner_image: image_secure_url,
            }
        })

        console.log("This endpoint is hit and i ", newCourse)
        return NextResponse.json({
            success: "True",
            newCourse
        })
    } catch (error:any) {
        return NextResponse.json({
            success: "False",
            error: error.message
        })
    }
}

//Get all courses
export async function GET() {
    try {
        const allCourses = await prisma.course.findMany()
        return NextResponse.json({
            success: "true",
            allCourses
        })
    } catch (error:any) {
        return NextResponse.json({
            success: "False",
            error: error.message
        })
    }
}


