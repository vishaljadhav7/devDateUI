const ShimmerCard = () => (
    <div className="card bg-gray-200 shadow-xl p-4 rounded-lg animate-pulse">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full bg-gray-300"></div>
        <div className="ml-4 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-24"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </div>
      </div>
      <div className="h-8 bg-gray-300 rounded w-24"></div>
    </div>
  );


const ShimmerLoader = () => { 

    return (
        <div className="absolute top-0 bg-white w-screen h-screen flex flex-wrap gap-5 justify-center items-center">
            <ShimmerCard/>
            <ShimmerCard/>
            <ShimmerCard/>
            <ShimmerCard/>
            <ShimmerCard/>
            <ShimmerCard/>
            <ShimmerCard/>
            <ShimmerCard/>
            <ShimmerCard/>
            <ShimmerCard/>
            
        </div>
    )
}  

export default ShimmerLoader