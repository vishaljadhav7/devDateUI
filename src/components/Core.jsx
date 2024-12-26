import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { BASE_URL } from "../utils/constants"
import { addFeed } from "../utils/coreSlice"
import UserCard from "./UserCard"


const Core = () => {
  const dispatch = useDispatch()
  const core = useSelector((store) => store.core)

  const [errorMessage, setErrorMessage]  = useState('')

  const getFeed = async () =>{
    // if(core) return
    try {
      const res = await axios.get(BASE_URL + "/user/core", {
        withCredentials : true,
      })

     
      dispatch(addFeed(res?.data?.data))
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong')
    }
  }

  useEffect(()=>{
    getFeed();
  }, [])

  

  if(errorMessage){
    return <h1 className="text-3xl text-black font-bold flex justify-center pt-[30%]">OOPS {errorMessage}!</h1>  
  }
 
  if (core?.length <= 0){
    return (
      <div className=" absolute top-0 bg-white  w-screen min-h-screen flex justify-center items-center">
        <h1 className="text-3xl  font-bold text-black">No users left!</h1>
      </div>
    )
  }
  


  return (
    <div className=" absolute top-0 bg-white w-screen min-h-screen flex justify-center items-center pt-[5%]">
        <UserCard user={core && core[0] || []} />
    </div>
  )
}

export default Core