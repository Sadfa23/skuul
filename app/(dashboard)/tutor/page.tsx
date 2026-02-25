import React from 'react'
import CourseCard from '@/components/dashboardComponents/courseCard'
import { authOptions } from '@/app/lib/auth'
import { getServerSession } from 'next-auth'
import { prisma } from '@/app/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'


async function page() {
  const session = await getServerSession(authOptions);
          if (!session || session.user.role !== "TUTOR") {
              redirect("/login")
          }
          const tutorsCourses = await prisma.course.findMany({
              where: {
                  tutorId: session.user.id
              }
          })
  console.log("These are the courses",tutorsCourses)
  return (
    <div>
      <Link href={"/courses/create-course"}>
        <button 
          className='bg-blue-600 text-white font-semibold p-2 rounded-sm mb-2'>
          Create New Course
        </button>
      </Link>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {tutorsCourses.map(course => (
          <CourseCard 
          key={course.id}
          course_id={course.id}
          course_name={course.course_name} 
          price={course.price} 
          course_level={course.course_level} 
          banner_image={course.banner_image}/>
        ))}
      </div>
    </div>
    
  )
}

export default page