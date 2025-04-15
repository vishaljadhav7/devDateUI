const ShimmerChatLoader = () => {
  return (
    <div className="h-full w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-purple-500/20 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 py-3 px-4 flex items-center gap-3 relative overflow-hidden">
        {/* Shimmer overlay */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.2s_infinite] bg-gradient-to-r from-gray-200 via-purple-200/50 to-gray-200 z-10"></div>

        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-200 to-purple-200/50"></div>
        <div className="h-5 w-32 bg-gradient-to-r from-gray-200 to-purple-200/50 rounded-md"></div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/50 relative scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-100">
        {/* Shimmer overlay */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.2s_infinite] bg-gradient-to-r from-gray-200 via-purple-200/50 to-gray-200 z-10"></div>

        {/* Left message */}
        <div className="flex items-start gap-2 max-w-[70%]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-200 to-purple-200/50"></div>
          <div>
            <div className="h-4 w-20 bg-gradient-to-r from-gray-200 to-purple-200/50 rounded-md mb-1"></div>
            <div className="h-14 w-48 bg-gradient-to-r from-gray-200 to-purple-200/50 rounded-lg"></div>
          </div>
        </div>

        {/* Right message */}
        <div className="flex items-start gap-2 max-w-[70%] ml-auto flex-row-reverse">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-200 to-purple-200/50"></div>
          <div>
            <div className="h-4 w-20 bg-gradient-to-r from-gray-200 to-purple-200/50 rounded-md mb-1 ml-auto"></div>
            <div className="h-12 w-40 bg-gradient-to-r from-gray-200 to-purple-200/50 rounded-lg"></div>
          </div>
        </div>

        {/* Left message */}
        <div className="flex items-start gap-2 max-w-[70%]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-200 to-purple-200/50"></div>
          <div>
            <div className="h-4 w-20 bg-gradient-to-r from-gray-200 to-purple-200/50 rounded-md mb-1"></div>
            <div className="h-10 w-36 bg-gradient-to-r from-gray-200 to-purple-200/50 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="bg-white p-3 flex gap-2 border-t border-purple-500/20 relative overflow-hidden">
        {/* Shimmer overlay */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.2s_infinite] bg-gradient-to-r from-gray-200 via-purple-200/50 to-gray-200 z-10"></div>

        <div className="flex-1 h-8 bg-gradient-to-r from-gray-200 to-purple-200/50 rounded-md"></div>
        <div className="h-8 w-12 bg-gradient-to-r from-gray-200 to-purple-200/50 rounded-md"></div>
      </div>
    </div>
  );
};

export default ShimmerChatLoader;