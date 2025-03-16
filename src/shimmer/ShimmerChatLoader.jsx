const ShimmerChatLoader = () => {
    return (
      <div className="h-full w-full max-w-4xl bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gray-200 py-4 px-6 flex items-center gap-4 relative overflow-hidden">
          {/* Shimmer overlay */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>
  
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          <div className="h-6 w-40 bg-gray-300 rounded-md"></div>
        </div>
  
        {/* Chat Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50 relative">
          {/* Shimmer overlay */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>
  
          {/* Left message */}
          <div className="flex items-start gap-2 max-w-[80%]">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <div>
              <div className="h-4 w-24 bg-gray-200 rounded-md mb-1"></div>
              <div className="h-20 w-64 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
  
          {/* Right message */}
          <div className="flex items-start gap-2 max-w-[80%] ml-auto flex-row-reverse">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <div>
              <div className="h-4 w-24 bg-gray-200 rounded-md mb-1 ml-auto"></div>
              <div className="h-16 w-56 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
  
          {/* Left message */}
          <div className="flex items-start gap-2 max-w-[80%]">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <div>
              <div className="h-4 w-24 bg-gray-200 rounded-md mb-1"></div>
              <div className="h-12 w-48 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
  
        {/* Input area */}
        <div className="bg-gray-200 p-4 flex gap-2 relative overflow-hidden">
          {/* Shimmer overlay */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>
  
          <div className="flex-1 h-10 bg-gray-300 rounded-lg"></div>
          <div className="h-10 w-16 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    )
  }
  
  export default ShimmerChatLoader
  
  