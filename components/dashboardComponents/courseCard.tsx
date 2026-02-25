"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
interface CourseCardProps {
  course_id: string
  course_name: string
  price: number
  banner_image?: string | null
  course_level?: string | null
}

export default function CourseCard({
  course_id,
  course_name,
  price,
  banner_image,
  course_level,
}: CourseCardProps) {
  return (
    <Link href={`/student/courses/${course_id}`}>
    <Card className="overflow-hidden rounded-xl border border-gray-100 bg-white hover:shadow-lg transition-shadow cursor-pointer">
      
      {/* Banner Image */}
      <div className="relative h-48 w-full">
        <Image
          src={banner_image || "/cybersec-onlline-course.jpg"}
          alt={course_name}
          fill
          className="object-cover"
        />

        {/* Level Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/90 text-gray-800 backdrop-blur">
            {course_level}
          </Badge>
        </div>
      </div>

      <CardContent className="p-5 space-y-4">
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {course_name}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between">
          {price === 0 ? (
            <span className="text-base font-semibold text-green-600">
              Free
            </span>
          ) : (
            <span className="text-base font-semibold text-gray-900">
              ${price.toFixed(2)}
            </span>
          )}
        </div>

      </CardContent>
    </Card>
    </Link>
  )
}