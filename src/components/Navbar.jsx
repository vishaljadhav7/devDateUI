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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/auth/signout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      localStorage.removeItem("token");
      dispatch(removeUser());
      dispatch(clearConnections());
      dispatch(clearRequests());
      return navigate("/signin");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-between items-center px-4 h-12 w-full bg-white shadow-xl border-b-[1px] border-black py-7">
      <div className="max-w-4xl mx-auto flex justify-between items-center w-full">
        {/* Text Logo */}
        <div className="text-2xl md:text-3xl font-semibold">
          <Link
            to="/"
            className="bg-gradient-to-r from-purple-500 to-yellow-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            DevDates
          </Link>
        </div>

        {/* User Section */}
        {user ? (
          <div className="flex gap-4 items-center">
            {/* Welcome Message */}
            <h1 className="text-base font-normal text-gray-600 hidden md:block">
              Welcome, <span className="text-purple-500">{user.firstName}</span>
            </h1>

            {/* User Dropdown */}
            <div className="dropdown dropdown-end z-50">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full border-2 border-purple-500 overflow-hidden">
                  <img
                    alt="user avatar"
                    src={user.photoURL || "/default_avatar.png"}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 w-52 bg-white rounded-lg shadow-md p-2 z-50"
              >
                <li>
                  <Link
                    to="/"
                    className="text-base font-normal text-gray-800 hover:bg-gray-100 hover:text-purple-500 rounded-md"
                  >
                    Feed
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="text-base font-normal text-gray-800 hover:bg-gray-100 hover:text-purple-500 rounded-md flex justify-between"
                  >
                    Profile
                    <span className="badge badge-success bg-purple-500 text-white border-none">
                      New
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/connections"
                    className="text-base font-normal text-gray-800 hover:bg-gray-100 hover:text-purple-500 rounded-md"
                  >
                    Connections
                  </Link>
                </li>
                <li>
                  <Link
                    to="/requests"
                    className="text-base font-normal text-gray-800 hover:bg-gray-100 hover:text-purple-500 rounded-md"
                  >
                    Requests
                  </Link>
                </li>
                <li>
                  <a
                    onClick={handleLogout}
                    className="text-base font-normal text-red-500 hover:bg-red-50 hover:text-red-600 rounded-md cursor-pointer"
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
              <button className="bg-gradient-to-r from-purple-500 to-yellow-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-md text-base font-normal">
                Home
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;