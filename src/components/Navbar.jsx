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
    <div className="navbar flex justify-between relative z-40 backdrop-blur-lg bg-white/30 shadow-lg">
        <div className="w-[75px]"> 
          <img className="rounded-lg" src="./devdate_logo.jpg" alt="logo"/>
        </div>
       

      { user ? 
      (<div>
        <div className="flex gap-2 items-center">
          <h1 className="form-control font-bold text-teal-500">Welcome, {user.firstName}</h1>

          <div className="dropdown dropdown-end mx-5 flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >      
               <li>
                <Link to="/">Feed</Link>
              </li>

              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>

              <li>
                <Link to="/requests">Requests</Link>
              </li>

             
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div> ) :    

      (<div className="p-2">
          <Link to={"/homePage"}>
             <button className="btn">Home</button>
          </Link>
        </div>)
         
      }
    </div>
  )
}

export default Navbar