import { Link } from "react-router-dom";


const Navbar = () => {
  
  const user = null;

  return (
    <div className="navbar flex justify-between relative z-40 backdrop-blur-lg bg-white/30 shadow-lg">
        <div className="w-[75px]"> 
          <Link to={"/homePage"}>
          <img className="rounded-lg" src="./devdate_logo.jpg" alt="logo"/>
          </Link>
        </div>
       
      { user && <div>
        <div className="flex gap-10 items-center">
          <div className="form-control">Welcome, {user.firstName} WarHead</div>

          <div className="dropdown dropdown-end mx-5 flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
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
                {/* <a onClick={handleLogout}>Logout</a> */}
              </li>
            </ul>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default Navbar