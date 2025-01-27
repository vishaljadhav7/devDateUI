import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearConnections } from "../utils/connectionSlice"; 
import { clearRequests } from "../utils/requestSlice";


const Navbar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((store) => store.user);
   
  const handleLogout = async ( ) => {
    try {
      await axios.post(BASE_URL + "/auth/signout", {}, { 
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });
      localStorage.removeItem('token')
      dispatch(removeUser());
      dispatch(clearConnections())
      dispatch(clearRequests())
      return navigate("/signin");
    } catch (err) {
      // Error logic maybe redirect to error page
      console.error(err)
    }
  }
  return (
    <div className="flex justify-between items-center px-6 h-16 w-full bg-white shadow-sm fixed z-50">
    {/* Text Logo */}
    <div className="text-3xl font-bold text-gray-900">
      <Link to="/" className="hover:text-gray-700 transition-colors">
        Dev<span className="text-orange-400">Dates</span>
      </Link>
    </div>

    {/* User Section */}
    {user ? (
      <div className="flex gap-6 items-center ">
        {/* Welcome Message */}
        <h1 className="font-medium text-lg text-gray-700 hidden md:block">
          Welcome, <span className="font-bold text-indigo-600">{user.firstName}</span>
        </h1>

        {/* User Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar hover:bg-gray-100 transition-colors"
          >
            <div className="w-10 h-10 rounded-full border-2 border-indigo-500 overflow-hidden">
              <img
                alt="user avatar"
                src={user.photoURL || "/default_avatar.png"}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 w-52 bg-white rounded-box shadow-lg z-50 p-2"
          >
            <li>
              <Link to="/" className="hover:bg-gray-100 text-gray-700">
                Feed
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:bg-gray-100 text-gray-700 flex justify-between">
                Profile
                <span className="badge badge-success text-white">New</span>
              </Link>
            </li>
            <li>
              <Link to="/connections" className="hover:bg-gray-100 text-gray-700">
                Connections
              </Link>
            </li>
            <li>
              <Link to="/requests" className="hover:bg-gray-100 text-gray-700">
                Requests
              </Link>
            </li>
            <li>
              <a
                onClick={handleLogout}
                className="text-red-500 hover:bg-red-50 hover:text-red-700 cursor-pointer"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    ) : (
      // Guest View
      <div className="flex gap-4">
        <Link to="/homePage">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
            Home
          </button>
        </Link>
      </div>
    )}
  </div>
  );
}

export default Navbar