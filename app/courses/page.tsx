import CourseCard from "@/components/dashboardComponents/courseCard"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

export default function CoursesPage() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Courses
        </h1>

        <div className="flex items-center gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Add Course
          </Button>
          <Button variant="outline" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <CourseCard title="Beginner’s Guide to Design" price={50} />
        <CourseCard title="Beginner’s Guide to Design" price={50} />
        <CourseCard title="Beginner’s Guide to Design" price={50} />
      </div>
    </div>
  )
}