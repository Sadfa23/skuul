"use server" 

import { prisma } from "../lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth" // adjust to your auth config path


type EnrollResult =
  | { success: true; message: string }
  | { success: false; error: string }

export async function enrollInCourse(courseId: string): Promise<EnrollResult> {
  // 1. Auth check — get the currently logged-in user
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return { success: false, error: "You must be logged in to enroll." }
  }

  // 2. Fetch the user from DB to get their ID and role
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true },
  })

  if (!user) {
    return { success: false, error: "User not found." }
  }

  // 3. Only students can enroll
  if (user.role !== "STUDENT") {
    return {
      success: false,
      error: "Only students can enroll in courses.",
    }
  }

  // 4. Check the course exists
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: { id: true, tutorId: true, course_name: true },
  })

  if (!course) {
    return { success: false, error: "Course not found." }
  }

  // 5. Prevent a tutor from enrolling in their own course
  if (course.tutorId === user.id) {
    return {
      success: false,
      error: "You cannot enroll in your own course.",
    }
  }

  // 6. Check if already enrolled (the @@unique constraint on [studentId, courseId] will
  //    also catch this at the DB level, but we give a friendlier error here)
  const existingEnrollment = await prisma.enrollment.findUnique({
    where: {
      studentId_courseId: {
        studentId: user.id,
        courseId: course.id,
      },
    },
  })

  if (existingEnrollment) {
    return {
      success: false,
      error: "You are already enrolled in this course.",
    }
  }

  // 7. Create the enrollment
  await prisma.enrollment.create({
    data: {
      studentId: user.id,
      courseId: course.id,
    },
  })


  return {
    success: true,
    message: `Successfully enrolled in "${course.course_name}"!`,
  }
}