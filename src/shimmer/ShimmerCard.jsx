const ShimmerCard = () => {
  return (
    <div className="max-w-sm md:w-[330px] mx-auto bg-white rounded-lg shadow-md overflow-hidden relative">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>

      <div className="w-full h-48 bg-gray-200"></div>
      <div className="p-5">
        <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded-md w-5/6 mb-4"></div>
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-gray-200 rounded-md"></div>
          <div className="h-6 w-20 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  )
}

export default ShimmerCard

