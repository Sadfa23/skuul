import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { NextRequest } from "next/server";

// Get a particular course. Course page
export async function GET(req:NextRequest, 
    {params} : {params : {courseId: string}}) {

    const {courseId} = await params
    console.log(courseId)
    try {  
        const course = await prisma.course.findUnique({
            where : {
                id: courseId 
            }
        })
        return NextResponse.json({
            success: "True",
            course
        })
    } catch (error:any) {
        return NextResponse.json({
            success: "False",
            error: error.message
        })
    }
}

export async function DELETE(
    req: NextRequest,
    {params} : {params : {courseId: string}}
) {
    try {
        const session  = await getServerSession(authOptions)
        if (!session || session.user.role !== "TUTOR" || "ADMIN") {
            return NextResponse.json({
                Success: "False",
                message: "Unauthorized"
            })
        }
        const {courseId} = await params;
        const deletedCourse = await prisma.course.delete({
            where: {
                id : courseId
            }
        })

        return NextResponse.json({
            success: "True",
            deletedCourse
        })

    } catch (error:any) {
        return NextResponse.json({
            success: "False",
            error: error.message
        })
    }
}

export async function PATCH(
    req: NextRequest,
    {params} : {params : {courseId: string}}
) {
    try {
        const session  = await getServerSession(authOptions)
        if (!session || session.user.role !== "TUTOR" || "ADMIN") {
            return NextResponse.json({
                Success: "False",
                message: "Unauthorized"
            })
        }
        const {courseId} = params;
        const updateCourseInfo = await req.json()
        const updatedCourse = await prisma.course.update({
            where: {
                id : courseId
            },
            data: updateCourseInfo
        })

        return NextResponse.json({
            success: "True",
            updatedCourse
        })

    } catch (error:any) {
        return NextResponse.json({
            success: "False",
            error: error.message
        })
    }
}



