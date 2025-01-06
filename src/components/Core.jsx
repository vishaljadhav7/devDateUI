import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { BASE_URL } from "../utils/constants"
import { addFeed } from "../utils/coreSlice"
import UserCard from "./UserCard"
import ShimmerCard from '../components/ShimmerCard';


const Core = () => {
  const dispatch = useDispatch()
  const core = useSelector((store) => store.core)
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [errorMessage, setErrorMessage]  = useState('')

  const getFeed = async () =>{
    // if(core) return
    console.log("token ", localStorage.getItem('token'))
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/user/core", {
        params: {
          page: 1
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })

     
      dispatch(addFeed(res?.data?.data))
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong')
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(()=>{
    getFeed();
  }, [page])

  

  if(errorMessage){
    return <h1 className="text-3xl text-black font-bold flex justify-center pt-[30%]">OOPS {errorMessage}!</h1>  
  }
 
  if (core?.length <= 0){
    return (
      <div className=" absolute top-0 bg-white  w-screen min-h-screen flex justify-center items-center">
         <div className="p-4 flex flex-col gap-5">
         <h1 className="text-3xl  font-bold text-black">No users left!</h1>
           <button 
           className="btn btn-outline" 
           onClick={()=> setPage(prev => prev + 1)}
           disabled={loading} 
           >
            Load More!
          </button>
         </div>
      </div>
    )
  }


  


  return (
    <div className=" absolute top-0 bg-white w-screen min-h-screen flex justify-center items-center pt-[5%]">
       {core?.length >= 0 && (
        <UserCard user={core && core[0] || []} /> 
       )}

        {loading ? (
          <ShimmerCard/>
        ) : null}

    </div>
  )
}

export default Core