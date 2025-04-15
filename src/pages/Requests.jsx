import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/requestSlice";
import ShimmerLoader from "../shimmer/ShimmerLoader";
import { motion } from "framer-motion";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const getRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/user/request/received", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(addRequest(res.data.data));
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching requests:", error);
      setErrorMessage("Failed to load requests. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestReview = async (status, requestId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(removeRequest(requestId));
      setErrorMessage("");
    } catch (error) {
      console.error("Error updating request status:", error);
      setErrorMessage("Failed to update request status. Please try again later.");
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (loading) {
    return <ShimmerLoader type="request" />;
  }

  if (requests?.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-purple-50 to-yellow-100">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold text-gray-800 bg-white rounded-lg shadow-md p-6 max-w-md mx-auto"
        >
          No Requests Found
        </motion.h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-purple-50 to-yellow-100 flex flex-col items-center py-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent"></div>
        <div className="absolute top-0 left-0 w-3/4 h-1/2 bg-green-200/10 rounded-b-[100%] blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-purple-200/10 rounded-tl-[100%] blur-3xl" />
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-2 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-semibold text-gray-800 text-center mb-6"
        >
          Connect Invitations
        </motion.h1>

        {/* Error Message */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-red-100 border border-red-200 rounded-lg p-4 max-w-md mx-auto text-center mb-6"
          >
            <p className="text-sm text-red-500">{errorMessage}</p>
          </motion.div>
        )}

        {/* Scrollable Card Container */}
        <div className="h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-100 flex flex-col gap-4">
          {requests.map((request, index) => {
            const { fromUserId, _id } = request;

            if (!fromUserId) return null;

            return (
              <motion.div
                key={_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto w-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={fromUserId?.photoURL || "https://via.placeholder.com/50"}
                      alt={`${fromUserId.firstName} ${fromUserId.lastName}`}
                      className="w-12 h-12 rounded-full border-2 border-purple-500/20 object-cover"
                    />
                    <div>
                      <h2 className="text-lg md:text-xl font-medium text-gray-800">
                        {fromUserId.firstName} {fromUserId.lastName}
                      </h2>
                      <p className="text-base font-normal text-gray-600 mt-1 line-clamp-2">
                        {fromUserId.about}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {fromUserId.skills.map((skill, skillIndex) => (
                          <motion.span
                            key={skillIndex}
                            className="bg-black text-white text-xs font-normal px-2 py-1 rounded-full"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: skillIndex * 0.1 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <motion.button
                      className="w-1/2 sm:w-24 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300 text-base font-normal shadow-md"
                      onClick={() => handleRequestReview("accepted", _id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Accept
                    </motion.button>
                    <motion.button
                      className="w-1/2 sm:w-24 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300 text-base font-normal shadow-md"
                      onClick={() => handleRequestReview("ignored", _id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Ignore
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;