import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


const Feed = () => {
  const navigate = useNavigate()
  const userExist = useSelector((store) => store.user)

  useEffect(()=>{
      if(!userExist){
         navigate('/homepage')
      }
  }, [])

  return (
    <div>
        Feed
    </div>
  )
}

export default Feed