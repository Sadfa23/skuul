// StatsSection.jsx
export default function StatsSection() {
    const stats = [
      { number: "250+", label: "Courses by our best mentors" },
      { number: "1000+", label: "Courses by our best mentors" },
      { number: "15+", label: "Courses by our best mentors" },
      { number: "2400+", label: "Courses by our best mentors" }
    ];
  
    return (
      <section className="bg-gradient-to-br from-pink-50 via-white to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }