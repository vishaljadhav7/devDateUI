import ShimmerCard from "./ShimmerCard"
import ShimmerConnectionCard from "./ShimmerConnectionCard"
import ShimmerRequestCard from "./ShimmerRequestCard"
import ShimmerChatLoader from "./ShimmerChatLoader"

// type ShimmerLoaderProps = {
//   type?: "card" | "connection" | "request" | "chat"
//   count?: number
// }

const ShimmerLoader = ({ type = "card", count = 6 }) => {
  const renderShimmerComponent = () => {
    switch (type) {
      case "connection":
        return Array(count)
          .fill(0)
          .map((_, index) => <ShimmerConnectionCard key={index} />)
      case "request":
        return Array(count)
          .fill(0)
          .map((_, index) => <ShimmerRequestCard key={index} />)
      case "chat":
        return <ShimmerChatLoader />
      default:
        return Array(count)
          .fill(0)
          .map((_, index) => <ShimmerCard key={index} />)
    }
  }

  return (
    <div className="w-full min-h-screen bg-white p-4 flex flex-col items-center pt-[10%] md:pt-[5%]">
      <div className="h-8 w-48 bg-gray-200 rounded-md mb-8 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 md:px-10">
        {renderShimmerComponent()}
      </div>
    </div>
  )
}

export default ShimmerLoader

