import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/coreSlice";
import UserCard from "./UserCard";
import ShimmerLoader from "./Shimmer";
import { motion } from "framer-motion";

const Core = () => {
  const dispatch = useDispatch();
  const core = useSelector((store) => store.core);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const getFeed = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/user/core", {
        params: { page },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, [page]);

  if (errorMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-purple-50 to-yellow-100">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold text-red-500 bg-white rounded-lg shadow-md p-6 max-w-md mx-auto"
        >
          OOPS {errorMessage}!
        </motion.h1>
      </div>
    );
  }

  if (core?.length <= 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-purple-50 to-yellow-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto flex flex-col gap-4 items-center"
        >
          <h1 className="text-3xl font-semibold text-gray-800">No users left!</h1>
          <motion.button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300 text-base font-normal shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? "Loading..." : "Load More"}
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return <ShimmerLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-purple-50 to-yellow-100 flex justify-center items-center py-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent"></div>
        <div className="absolute top-0 left-0 w-3/4 h-1/2 bg-green-200/10 rounded-b-[100%] blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-purple-200/10 rounded-tl-[100%] blur-3xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mx-auto px-4 sm:px-2 relative z-10"
      >
        {core?.length >= 0 && <UserCard user={core && core[0] || []} />}
      </motion.div>
    </div>
  );
};

export default Core;