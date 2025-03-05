export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full h-64 bg-gradient-to-b from-teal-800 to-teal-600 animate-pulse"></div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 h-80 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="md:w-1/2">
            <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse mb-6"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-3"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-3"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-3"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-3"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="h-10 w-1/4 bg-gray-200 rounded animate-pulse mb-8 mx-auto"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

