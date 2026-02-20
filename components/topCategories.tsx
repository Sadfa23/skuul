// TopCategories.jsx
export default function TopCategories() {
    const categories = [
      { name: "Astrology", icon: "🎨", color: "from-purple-100 to-purple-200" },
      { name: "Development", icon: "💻", color: "from-blue-100 to-blue-200" },
      { name: "Marketing", icon: "📊", color: "from-pink-100 to-pink-200" },
      { name: "Physics", icon: "🔬", color: "from-cyan-100 to-cyan-200" }
    ];
  
    return (
      <section className="bg-gradient-to-br from-pink-50 via-white to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Top Categories</h2>
            <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              See All
            </a>
          </div>
  
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }