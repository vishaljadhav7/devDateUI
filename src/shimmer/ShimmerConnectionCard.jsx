const ShimmerConnectionCard = () => {
  return (
    <div className="max-w-xs w-full mx-auto bg-white rounded-lg shadow-md border border-purple-500/20 p-4 relative overflow-hidden group">
      {/* Corner Accent */}
      <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-br-full opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.2s_infinite] bg-gradient-to-r from-gray-200 via-purple-200/50 to-gray-200 z-10"></div>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-200 to-purple-200/50"></div>
        <div>
          <div className="h-5 w-28 bg-gradient-to-r from-gray-200 to-purple-200/50 rounded-md mb-1"></div>
          <div className="h-4 w-20 bg-gradient-to-r from-gray-200 to-purple-200/50 rounded-md"></div>
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-2">
        <div className="h-8 w-16 bg-gradient-to-r from-gray-200 to-purple-200/50 rounded-md"></div>
        <div className="h-8 w-16 bg-gradient-to-r from-gray-200 to-purple-200/50 rounded-md"></div>
      </div>
    </div>
  );
};

export default ShimmerConnectionCard;