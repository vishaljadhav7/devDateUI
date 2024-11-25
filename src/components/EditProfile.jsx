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
    
    //  setError("");

     const  {
      firstName,
      lastName,
      photoURL,
      age,
      gender,
      about,
    } = formData

    try {
      // setTimeout(() => {
      //   dispatch(toggleEditProfileView(false))
      // }, 3000);
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
        { withCredentials: true }
      );

      console.log("res from updated profile",res?.data.userInfo)
      dispatch(addUser(res?.data.userInfo));
      // setShowToast(true);
    } catch (err) {
      setError(err.response.data);
    }
  };


  return (
    <div className="modal modal-open ">
      <div className="modal-box w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData?.firstName}

              onChange={handleChange}
              placeholder="Enter your first name"
              className="input input-bordered w-full"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData?.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="input input-bordered w-full"
            />
          </div>

          {/* Age */}
          <div>
            <label className="label">
              <span className="label-text">Age</span>
            </label>
            <input
              type="number"
              name="age"
              min={18}
              value={formData?.age}
              onChange={handleChange}
              placeholder="Enter your age"
              className="input input-bordered w-full"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="url"
              name="photoURL"
              value={formData?.photoURL}
              onChange={handleChange}
              placeholder="Enter photo URL"
              className="input input-bordered w-full"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <select
              name="gender"
              value={formData?.gender}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value={user?.age} disabled>
                Select gender
              </option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="others">others</option>
            </select>
          </div>

          {/* About */}
          <div>
            <label className="label">
              <span className="label-text">About</span>
            </label>
            <textarea
              name="about"
              value={formData?.about}
              onChange={handleChange}
              placeholder="Write something about yourself"
              className="textarea textarea-bordered w-full"
            />
          </div>

          {/* Submit Button */}
          <div className="modal-action">
            <button type="submit" className="btn btn-primary w-full">
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <button 
      className="w-[70px] absolute right-[5%] top-[5%] z-40 text-4xl text-white font-bold" 
      onClick={()=> dispatch(toggleEditProfileView(false))}
      >
        X
      </button>
    </div>
  );
};

export default EditProfile;
