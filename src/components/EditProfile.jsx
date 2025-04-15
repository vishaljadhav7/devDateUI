import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleEditProfileView } from "../utils/profileSlice";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { motion } from "framer-motion";

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [error, setError] = useState("");
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, photoURL, age, gender, about } = formData;

    try {
      setTimeout(() => {
        dispatch(toggleEditProfileView(false));
      }, 1000);
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoURL,
          age,
          gender,
          about,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(addUser(res?.data.data));
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/30 backdrop-blur-md z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-full max-w-md rounded-lg shadow-md border border-purple-500/20 overflow-hidden group"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 py-3 px-4">
          <h2 className="text-lg font-medium text-white text-center">Edit Profile</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">First Name</label>
            <motion.input
              type="text"
              name="firstName"
              value={formData?.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full px-3 py-2 bg-gray-50 border border-purple-500/20 rounded-md text-base font-normal text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Last Name</label>
            <motion.input
              type="text"
              name="lastName"
              value={formData?.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full px-3 py-2 bg-gray-50 border border-purple-500/20 rounded-md text-base font-normal text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Age</label>
            <motion.input
              type="number"
              name="age"
              min={18}
              value={formData?.age}
              onChange={handleChange}
              placeholder="Enter your age"
              className="w-full px-3 py-2 bg-gray-50 border border-purple-500/20 rounded-md text-base font-normal text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Photo URL</label>
            <motion.input
              type="url"
              name="photoURL"
              value={formData?.photoURL}
              onChange={handleChange}
              placeholder="Enter photo URL"
              className="w-full px-3 py-2 bg-gray-50 border border-purple-500/20 rounded-md text-base font-normal text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Gender</label>
            <motion.select
              name="gender"
              value={formData?.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-purple-500/20 rounded-md text-base font-normal text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </motion.select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">About</label>
            <motion.textarea
              name="about"
              value={formData?.about}
              onChange={handleChange}
              placeholder="Write something about yourself"
              className="w-full px-3 py-2 bg-gray-50 border border-purple-500/20 rounded-md text-base font-normal text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={4}
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
              className="bg-red-100 border border-red-200 rounded-md p-2 text-sm text-red-500 text-center"
            >
              {error}
            </motion.p>
          )}

          <div>
            <motion.button
              type="submit"
              className="relative w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg text-base font-normal shadow-md overflow-hidden group/button"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 4px 12px rgba(249, 115, 22, 0.4)",
                backgroundPosition: "100% 0",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              style={{ backgroundSize: "200% 100%", backgroundPosition: "0 0" }}
            >
              <span className="relative z-10">Save Changes</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </div>
        </form>

        <motion.button
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-md text-white text-lg"
          onClick={() => dispatch(toggleEditProfileView(false))}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          ×
        </motion.button>
      </motion.div>
    </div>
  );
};

export default EditProfile;