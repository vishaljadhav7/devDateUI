const ShimmerRequestCard = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md border border-purple-500/20 w-full max-w-md mx-auto relative overflow-hidden">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.2s_infinite] bg-gradient-to-r from-gray-200 via-purple-200/50 to-gray-200 z-10"></div>

      <div className="flex items-center space-x-3 w-full sm:w-auto">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-200 to-purple-200/50"></div>
        <div>
          <div className="h-5 w-28 bg-gradient-to-r from-gray-200 to-purple-200/50 rounded-md mb-2"></div>
          <div className="h-4 w-36 bg-gradient-to-r from-gray-200 to-purple-200/50 rounded-md mb-2"></div>
          <div className="flex flex-wrap gap-2 mt-1">
            <div className="h-4 w-14 bg-gradient-to-r from-gray-200 to-purple-200/50 rounded-full"></div>
            <div className="h-4 w-16 bg-gradient-to-r from-gray-200 to-purple-200/50 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="flex space-x-2 mt-3 sm:mt-0">
        <div className="h-8 w-16 bg-gradient-to-r from-gray-200 to-purple-200/50 rounded-md"></div>
        <div className="h-8 w-16 bg-gradient-to-r from-gray-200 to-purple-200/50 rounded-md"></div>
      </div>
    </div>
  );
};

export default ShimmerRequestCard;