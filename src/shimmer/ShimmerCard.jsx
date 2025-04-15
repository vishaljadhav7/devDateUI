const ShimmerCard = () => {
  return (
    <div className="max-w-xs w-full mx-auto bg-white rounded-lg shadow-md border border-purple-500/20 overflow-hidden relative">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.2s_infinite] bg-gradient-to-r from-gray-200 via-purple-200/50 to-gray-200 z-10"></div>

      <div className="w-full h-32 bg-gradient-to-r from-gray-200 to-purple-200/50"></div>
      <div className="p-3">
        <div className="h-5 bg-gradient-to-r from-gray-200 to-purple-200/50 rounded-md w-2/3 mb-3"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 to-purple-200/50 rounded-md w-full mb-2"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 to-purple-200/50 rounded-md w-5/6 mb-3"></div>
        <div className="flex justify-center gap-2">
          <div className="h-5 w-16 bg-gradient-to-r from-gray-200 to-purple-200/50 rounded-md"></div>
          <div className="h-5 w-16 bg-gradient-to-r from-gray-200 to-purple-200/50 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerCard;