const ShimmerRequestCard = () => {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-6 shadow-lg rounded-xl w-full relative overflow-hidden">
        {/* Shimmer overlay */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>
  
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <div className="w-14 h-14 rounded-full bg-gray-200"></div>
          <div>
            <div className="h-6 w-32 bg-gray-200 rounded-md mb-2"></div>
            <div className="h-4 w-40 bg-gray-200 rounded-md mb-2"></div>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
              <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
              <div className="h-5 w-14 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <div className="h-10 w-20 bg-gray-200 rounded-lg"></div>
          <div className="h-10 w-20 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    )
  }
  
  export default ShimmerRequestCard
  
  