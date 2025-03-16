import ShimmerCard from "../shimmer/ShimmerCard"

const ShimmerLoader = () => { 

    return (
        <div className="absolute top-0 bg-white w-screen h-screen flex flex-wrap gap-5 justify-center items-center">
            <ShimmerCard/>
        </div>
    )
}  

export default ShimmerLoader