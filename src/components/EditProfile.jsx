import { useEffect, useState } from "react";
import { useDispatch , useSelector} from "react-redux";
import { toggleEditProfileView } from "../utils/profileSlice";
import axios from 'axios';
import { addUser } from "../utils/userSlice";
import {BASE_URL} from '../utils/constants'


const EditProfile = () => {
 const dispatch = useDispatch()
 const user= useSelector((store) => store.user);

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

     const  {
      firstName,
      lastName,
      photoURL,
      age,
      gender,
      about,
    } = formData

    try {
      setTimeout(() => {
        dispatch(toggleEditProfileView(false))
      }, 1000);
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoURL,
          age,
          gender,
          about
        },
        { 
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        }
      );


      dispatch(addUser(res?.data.data));
      // setShowToast(true);
    } catch (err) {
      setError(err.response.data);
    }
  };


  return  (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 ">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-in-out">
      
        <div className="bg-orange-400 p-6">
          <h2 className="text-2xl font-bold text-white text-center">Edit Profile</h2>
        </div>

        <form onSubmit={handleSubmit} 
        className="p-6 space-y-6 bg-white h-[400px] overflow-scroll">
    
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData?.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

      
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData?.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              type="number"
              name="age"
              min={18}
              value={formData?.age}
              onChange={handleChange}
              placeholder="Enter your age"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

       
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
            <input
              type="url"
              name="photoURL"
              value={formData?.photoURL}
              onChange={handleChange}
              placeholder="Enter photo URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

      
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={formData?.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

       \
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
            <textarea
              name="about"
              value={formData?.about}
              onChange={handleChange}
              placeholder="Write something about yourself"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              rows={4}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <button
        className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg text-2xl text-purple-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        onClick={() => dispatch(toggleEditProfileView(false))}
      >
        &times;
      </button>
    </div>
  );
};

export default EditProfile;
