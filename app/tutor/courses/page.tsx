import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

export default async function TutorCoursesPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "TUTOR") {
    return <p className="p-10 text-center">Unauthorized access.</p>;
  }

  // Fetch only courses belonging to this tutor
  const courses = await prisma.course.findMany({
    where: { tutorId: session.user.id },
  });

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Courses</h1>
        <Link href="/tutor/courses/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + Create New
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed">
          <p className="text-gray-500">You haven't created any courses yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-5 rounded-xl shadow-sm border flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{course.course_name}</h3>
                <p className="text-sm text-gray-500 truncate max-w-md">{course.description}</p>
              </div>
              
              <div className="flex gap-3">
                <Link 
                  href={`/tutor/courses/edit/${course.id}`}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Edit
                </Link>
                <Link 
                  href={`/tutor/courses/${course.id}/modules`}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Add Modules
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}