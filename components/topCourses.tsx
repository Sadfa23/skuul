// TopCourses.jsx
import Image from "next/image";
export default function TopCourses() {
    const courses = [
      {
        title: "Beginner's Guide to Design",
        author: "By Ronald Richards",
        rating: 5.0,
        students: "1200 Students",
        price: "$149.9",
        image: "/computer-science.jpg"
      },
      {
        title: "Beginner's Guide to Design",
        author: "By Ronald Richards",
        rating: 5.0,
        students: "1200 Students",
        price: "$149.9",
        image: "/dj-online-course.jpg"
      },
      {
        title: "Beginner's Guide to Design",
        author: "By Ronald Richards",
        rating: 5.0,
        students: "1200 Students",
        price: "$149.9",
        image: "/cybersec-onlline-course.jpg"
      },
      {
        title: "Beginner's Guide to Design",
        author: "By Ronald Richards",
        rating: 5.0,
        students: "1200 Students",
        price: "$149.9",
        image: "/computer-science.jpg"
      }
    ];
  
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
              <div 
                key={index}
                className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
              >
                <Image 
                  src={course.image} 
                  width={300}
                  height={200}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{course.author}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">⭐</span>
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">{course.students}</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">{course.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }