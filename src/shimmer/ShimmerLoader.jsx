import ShimmerCard from "./ShimmerCard";
import ShimmerConnectionCard from "./ShimmerConnectionCard";
import ShimmerRequestCard from "./ShimmerRequestCard";
import ShimmerChatLoader from "./ShimmerChatLoader";

const ShimmerLoader = ({ type = "card", count = 6 }) => {
  const renderShimmerComponent = () => {
    switch (type) {
      case "connection":
        return Array(count)
          .fill(0)
          .map((_, index) => <ShimmerConnectionCard key={index} />);
      case "request":
        return Array(count)
          .fill(0)
          .map((_, index) => <ShimmerRequestCard key={index} />);
      case "chat":
        return <ShimmerChatLoader />;
      default:
        return Array(count)
          .fill(0)
          .map((_, index) => <ShimmerCard key={index} />);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-50 via-purple-50 to-yellow-100 py-8 flex flex-col items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent"></div>
        <div className="absolute top-0 left-0 w-3/4 h-1/2 bg-green-200/10 rounded-b-[100%] blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-purple-200/10 rounded-tl-[100%] blur-3xl" />
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-2">
        <div className="h-6 w-32 bg-gradient-to-r from-gray-200 to-purple-200/50 rounded-md mb-6 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.2s_infinite] bg-gradient-to-r from-gray-200 via-purple-200/50 to-gray-200"></div>
        </div>
        {type === "chat" ? (
          renderShimmerComponent()
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderShimmerComponent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShimmerLoader;