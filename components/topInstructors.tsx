// TopInstructors.jsx
import Image from "next/image";
export default function TopInstructors() {
    const instructors = [
      {
        name: "Ronald Richards",
        title: "UI/UX Designer",
        rating: 4.9,
        students: "2400 Students",
        image: "/pexels-george-pak-7972568.jpg"
      },
      {
        name: "Ronald Richards",
        title: "UI/UX Designer",
        rating: 4.9,
        students: "2400 Students",
        image: "/pexels-george-pak-7972568.jpg"
      },
      {
        name: "Ronald Richards",
        title: "UI/UX Designer",
        rating: 4.9,
        students: "2400 Students",
        image: "/pexels-george-pak-7972568.jpg"
      },
      {
        name: "Ronald Richards",
        title: "UI/UX Designer",
        rating: 4.9,
        students: "2400 Students",
        image: "/pexels-george-pak-7972568.jpg"
      },
      {
        name: "Ronald Richards",
        title: "UI/UX Designer",
        rating: 4.9,
        students: "2400 Students",
        image: "/pexels-george-pak-7972568.jpg"
      }
    ];
  
    return (
      <section className="bg-gradient-to-br from-pink-50 via-white to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Top Instructors</h2>
            <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              See All
            </a>
          </div>
  
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {instructors.map((instructor, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
              >
                <Image
                  src={instructor.image}
                  width={150}
                  height={150}
                  alt={instructor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-gray-900 mb-1">{instructor.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{instructor.title}</p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">⭐</span>
                    <span className="font-medium">{instructor.rating}</span>
                  </div>
                  <span className="text-gray-500">{instructor.students}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }