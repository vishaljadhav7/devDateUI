import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { removeUserFromFeed } from "../utils/coreSlice"
import { useDispatch } from "react-redux"
import { useMemo, useState } from "react"

const UserCard = ({user}) => {
  const {_id, firstName, lastName, photoURL, age, gender, about, skills } = user;
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage]  = useState('')
 
  const handleSendRequest = async (status, toUserId) => {
   try {
     const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + toUserId, {} ,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        }
     ); 
     dispatch(removeUserFromFeed(toUserId)); 
   } catch (error) {
    setErrorMessage(error.message || 'Something went wrong')
   }
  }

  const aboutInfo = about?.length > 100 ? about?.slice(0,100) : about;
  
  return (
    <div className="max-w-sm md:w-[330px] mx-auto bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
    <img
      className="w-full h-48 object-cover transform transition duration-300 hover:scale-110"
      src={photoURL}
      alt={`${firstName} ${lastName}`}
    />
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {firstName} {lastName}, {age}
      </h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        {aboutInfo} ...
      </p>
      <div className="mb-6">
        <h3 className="text-gray-800 font-semibold mb-2">Skills:</h3>
        <ul className="flex flex-wrap gap-2">
          {skills &&
            skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
        </ul>
      </div>
      <div className="flex justify-around">
        <button
          onClick={() => handleSendRequest("ignored", _id)}
          className="btn btn-outline btn-error w-24 hover:bg-red-50 hover:border-red-600 hover:text-red-600 transition duration-300"
        >
          Ignore
        </button>
        <button
          onClick={() => handleSendRequest("interested", _id)}
          className="btn btn-primary w-24 bg-blue-600 hover:bg-blue-700 text-white transition duration-300"
        >
          Interested
        </button>
      </div>
    </div>
  </div>
  )
}

export default UserCard