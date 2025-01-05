import { useSelector } from "react-redux";
import EditProfile from "../components/EditProfile";
import { useDispatch } from "react-redux";
import { toggleEditProfileView } from "../utils/profileSlice";

const Profile = () => {
  const dispatch = useDispatch()
  const profile = useSelector((store) => store.profile)
  const user = useSelector((store) => store.user);

     

  return (
    <div className="absolute top-0 bg-white w-screen min-h-screen flex justify-center items-center p-6">
      {user && (
        <div className=" shadow-xl max-w-md w-full p-6 md:max-w-lg lg:max-w-xl md:mt-[7%] mt-12 relative  bg-slate-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border border-gray-100">
   
          <button className="absolute top-4 right-4 btn btn-sm btn-outline btn-primary " onClick={()=> dispatch(toggleEditProfileView(true))}>
            Edit Profile
          </button>

     
          <div className="flex flex-col items-center">
            <img
              src={user?.photoURL}
              alt={`${user?.firstName} ${user?.lastName}`}
              className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-primary shadow-sm object-cover"
            />
            <h1 className="text-2xl md:text-3xl font-bold mt-4 text-gray-800 text-center">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-gray-500 text-sm md:text-base mt-1">{user?.emailId}</p>
            <p className="bg-primary/20 text-primary text-xs md:text-sm font-semibold px-4 py-1 rounded-full mt-3">
              Developer
            </p>
          </div>

          {/* Skills Section */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Skills
            </h2>
            {user?.skills?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user?.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-4 py-2 text-sm font-medium rounded-lg shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                No skills added yet. Update your profile to add skills.
              </p>
            )}
          </div>

          {/* Contact Section */}
          <div className="mt-8 border-t pt-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Contact Info
            </h2>
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {user?.emailId}
            </p>
          </div>

          <div className="mt-8 border-t pt-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              About
            </h2>
            <p className="text-gray-600">
              <span className="font-medium">Bio:</span> {user?.about}
            </p>
          </div>
        </div>
      )}

      {profile?.showEditProfile && <EditProfile/>}
    </div>
  );
};

export default Profile;
