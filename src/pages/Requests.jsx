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
        withCredentials: true,
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
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
      setErrorMessage(""); // Clear any previous error
    } catch (error) {
      console.error("Error updating request status:", error);
      setErrorMessage("Failed to update request status. Please try again later.");
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  // if (!requests) return;

  if (requests?.length === 0)
    return <h1 className="absolute top-0 bg-white w-screen h-screen flex justify-center items-center text-3xl text-black">No Requests Found</h1>;

  if(loading){
    return <ShimmerLoader/>
}


  return (
    <div className="absolute top-0 bg-white  w-screen h-screen ">
      <div className="h-full w-full py-10 px-4 flex flex-col justify-center items-center pt-[30%] md:pt-[10%]">
        <h1 className="text-bold text-black text-3xl mb-4">Connect Invitations</h1>

        {/* Display Error Message */}
        {errorMessage && (
          <div className="text-red-500 bg-red-100 p-4 rounded-md w-full max-w-md text-center mb-4">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col gap-7 md:w-[70%]  w-full items-center overflow-y-scroll">
          {requests.map((request) => {
            const { fromUserId, _id } = request;

            if(!fromUserId) return
            
            return (
              <div
                key={_id}
                className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 shadow rounded-lg w-full"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={fromUserId?.photoURL || "https://via.placeholder.com/50"}
                    alt={`${fromUserId.firstName} ${fromUserId.lastName}`}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">
                      {fromUserId.firstName} {fromUserId.lastName}
                    </h2>
                    <p className="text-sm text-gray-600">{fromUserId.about}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {fromUserId.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4 sm:mt-0">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleRequestReview("accepted", _id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
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
