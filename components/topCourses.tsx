// TopCourses.jsx
import Image from "next/image";
import { prisma } from "@/app/lib/prisma";
import CourseCard from "./dashboardComponents/courseCard";

export default async function TopCourses() {

    const courses = await prisma.course.findMany({
      take:4
    })

    console.log("COURSES :", courses)

  
    return (
      <section className="bg-gradient-to-br from-pink-50 via-white to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Top Courses</h2>
            <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              See All
            </a>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <CourseCard
              key={course.id} 
              course_id={course.id}
              course_name={course.course_name} 
              price={course.price} 
              banner_image={course.banner_image} 
              course_level={course.course_level}/>
            ))}
          </div>
        </div>
      </section>
    );
  }