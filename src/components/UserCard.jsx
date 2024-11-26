import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { removeUserFromFeed } from "../utils/coreSlice"
import { useDispatch } from "react-redux"
import { useState } from "react"

const UserCard = ({user}) => {
  const {_id, firstName, lastName, photoURL, age, gender, about, skills } = user;
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage]  = useState('')
 
  const handleSendRequest = async (status, toUserId) => {
   try {
     const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + toUserId, {} ,
        {
        withCredentials : true,
        }
     ); 
     dispatch(removeUserFromFeed(toUserId)); 
   } catch (error) {
    setErrorMessage(error.message || 'Something went wrong')
   }
  }
  
  return (
    <div className=" max-w-sm md:w-[330px] mx-auto bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
    <img
      className="w-full h-48 object-cover"
      src={photoURL}
      alt={`${firstName} ${lastName}`}
    />
    <div className="p-5">
      <h2 className="text-2xl font-semibold text-gray-800">
        {firstName} {lastName}, {age}
      </h2>
      <p className="text-gray-600 mt-2">{about}</p>
      <div className="mt-3">
        <h3 className="text-gray-800 font-semibold">Skills:</h3>
        <ul className="flex flex-wrap gap-2 mt-1">
          {skills && skills?.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </ul>
      </div>
      <div className="flex justify-around mt-5">
        <button
        onClick={() => handleSendRequest("ignored", _id)}
          className="btn btn-outline btn-error w-24"
        >
          Ignore
        </button>
        <button
            onClick={() => handleSendRequest("interested", _id)}
          className="btn btn-primary w-24"
        >
          Interested
        </button>
      </div>
    </div>
  </div>
  )
}

export default UserCard