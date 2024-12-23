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
      await axios.post(BASE_URL + "/auth/signout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(clearConnections())
      dispatch(clearRequests())
      return navigate("/signin");
    } catch (err) {
      // Error logic maybe redirect to error page
    }
  }
  return (
    <div className="navbar flex justify-between items-center px-4 py-2 bg-white/30 backdrop-blur-lg shadow-lg relative z-40 w-screen">
      {/* Text Logo */}
      <div className="text-3xl font-bold text-[#374151]">
       <Link to="/">Dev<span className="text-[#10B981]">Dates</span></Link>
     </div>


      {/* User Section */}
      {user ? (
        <div className="flex gap-4 items-center">
          <h1 className="font-medium text-lg text-gray-700 hidden md:block">
            Welcome, <span className="font-bold text-[#4F46E5]">{user.firstName}</span>
          </h1>

          {/* User Dropdown */}
          <div className="dropdown dropdown-end relative">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-full border-2 border-[#4F46E5] overflow-hidden">
                <img
                  alt="user avatar"
                  src={user.photoURL || "/default_avatar.png"}
                  className="object-cover"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 w-52 bg-white rounded-lg shadow-lg z-50 p-2"
            >
              <li>
                <Link to="/" className="hover:text-[#4F46E5]">Feed</Link>
              </li>
              <li>
                <Link to="/profile" className="flex justify-between hover:text-[#4F46E5]">
                  Profile
                  <span className="badge bg-[#14B8A6] text-white">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" className="hover:text-[#4F46E5]">Connections</Link>
              </li>
              <li>
                <Link to="/requests" className="hover:text-[#4F46E5]">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout} className="text-red-600 hover:text-red-800 cursor-pointer">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        // Guest View
        <div className="p-2">
          <Link to="/homePage">
            <button className="btn bg-[#4F46E5] text-white px-4 py-2 rounded-lg hover:bg-[#3B32C4] transition-all">
              Home
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar