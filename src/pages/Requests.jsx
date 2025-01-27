import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/requestSlice";
import ShimmerLoader from '../components/Shimmer'

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false)

  const getRequests = async () => {
    // if (requests?.length > 0) return;
    try {
      setLoading(true)
      const res = await axios.get(BASE_URL + "/user/request/received", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });
      dispatch(addRequest(res.data.data));
      setErrorMessage(""); // Clear any previous error
    } catch (error) {
      console.error("Error fetching requests:", error);
      setErrorMessage("Failed to load requests. Please try again later.");
    }finally{
      setLoading(false)
    }
  };

  const handleRequestReview = async (status, requestId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(removeRequest(requestId));
      setErrorMessage(""); // Clear any previous error
    } catch (error) {
      console.error("Error updating request status:", error);
      setErrorMessage("Failed to update request status. Please try again later.");
    }
  };

  useEffect(() => {
    // if(requests?.length) return
    getRequests();
  }, []);

  // if (!requests) return;

  if (requests?.length === 0)
    return <h1 className=" bg-white w-screen h-screen flex justify-center items-center text-3xl text-black">No Requests Found</h1>;

  if(loading){
    return <ShimmerLoader/>
}


  return (
    <div className=" bg-white w-screen h-screen">
    <div className="h-full w-full py-10 px-4 flex flex-col justify-center items-center pt-[30%] md:pt-[10%]">
      <h1 className="font-bold text-black text-3xl mb-6">Connect Invitations</h1>
  
      {/* Display Error Message */}
      {errorMessage && (
        <div className="text-red-500 bg-red-100 p-4 rounded-md w-full max-w-md text-center mb-6">
          {errorMessage}
        </div>
      )}
  
      <div className="flex flex-col gap-6 md:w-[70%] w-full items-center overflow-y-auto">
        {requests.map((request) => {
          const { fromUserId, _id } = request;
  
          if (!fromUserId) return null;
  
          return (
            <div
              key={_id}
              className="flex flex-col sm:flex-row items-center justify-between bg-white p-6 shadow-lg rounded-xl w-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={fromUserId?.photoURL || "https://via.placeholder.com/50"}
                  alt={`${fromUserId.firstName} ${fromUserId.lastName}`}
                  className="w-14 h-14 rounded-full border-2 border-gray-100 object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {fromUserId.firstName} {fromUserId.lastName}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">{fromUserId.about}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {fromUserId.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 mt-4 sm:mt-0">
                <button
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  onClick={() => handleRequestReview("accepted", _id)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  onClick={() => handleRequestReview("ignored", _id)}
                >
                  Ignore
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
  );
};

export default Requests;
