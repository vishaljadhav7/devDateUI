import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/coreSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { motion } from "framer-motion";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoURL, age, gender, about, skills } = user;
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSendRequest = async (status, toUserId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + toUserId,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(removeUserFromFeed(toUserId));
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong");
    }
  };

  const aboutInfo = about?.length > 100 ? about?.slice(0, 100) : about;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.02,
        translateY: -4,
        boxShadow: "0 6px 15px rgba(168, 85, 247, 0.3)",
        borderColor: "rgba(168, 85, 247, 0.5)",
      }}
      transition={{ duration: 0.3 }}
      className="relative max-w-xs w-full mx-auto bg-white rounded-lg shadow-md border border-transparent overflow-hidden group"
    >
      {/* Image with Gradient Overlay */}
      <div className="relative">
        <motion.img
          className="w-full h-32 object-cover"
          src={photoURL}
          alt={`${firstName} ${lastName}`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-800/20 to-transparent" />
      </div>
      {/* Avatar Overlay */}
      <div className="flex justify-center -mt-8">
        <motion.img
          className="w-16 h-16 rounded-full border-2 border-purple-500/20 object-cover"
          src={photoURL}
          alt={`${firstName} ${lastName}`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="p-3 text-center">
        <h2 className="text-lg font-medium text-gray-800 mb-1">
          {firstName} {lastName}, {age}
        </h2>
        <p className="text-sm font-normal text-gray-600 mb-3 line-clamp-2">
          {aboutInfo}...
        </p>
        <div className="mb-3">
          <h3 className="text-base font-medium text-gray-800 mb-1">Skills</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {skills &&
              skills.map((skill, index) => (
                <motion.span
                  key={index}
                  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs font-normal px-2 py-1 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  {skill}
                </motion.span>
              ))}
          </div>
        </div>
        <div className="flex justify-center gap-2">
          <motion.button
            onClick={() => handleSendRequest("ignored", _id)}
            className="relative w-1/2 bg-gradient-to-r from-gray-600 to-gray-800 text-white px-4 py-2 rounded-lg text-base font-normal shadow-md overflow-hidden group/button"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 4px 12px rgba(75, 85, 99, 0.4)",
              backgroundPosition: "100% 0",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundSize: "200% 100%", backgroundPosition: "0 0" }}
          >
            <span className="relative z-10 flex items-center justify-center gap-1">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm"
              >
                ✗
              </motion.span>
              Ignore
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />
          </motion.button>
          <motion.button
            onClick={() => handleSendRequest("interested", _id)}
            className="relative w-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg text-base font-normal shadow-md overflow-hidden group/button"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 4px 12px rgba(249, 115, 22, 0.4)",
              backgroundPosition: "100% 0",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundSize: "200% 100%", backgroundPosition: "0 0" }}
          >
            <span className="relative z-10 flex items-center justify-center gap-1">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm"
              >
                ✓
              </motion.span>
              Interested
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </div>
      </div>
      {errorMessage && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
          className="bg-red-100 border border-red-200 rounded-lg p-2 text-sm text-red-500 text-center"
        >
          {errorMessage}
        </motion.p>
      )}
    </motion.div>
  );
};

export default UserCard;