const ShimmerConnectionCard = () => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden">
        {/* Shimmer overlay */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>
  
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-200"></div>
          <div>
            <div className="h-6 w-32 bg-gray-200 rounded-md mb-2"></div>
            <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
          </div>
        </div>
        <div className="mt-6 w-full h-10 bg-gray-200 rounded-lg"></div>
      </div>
    )
  }
  
  export default ShimmerConnectionCard
  
  