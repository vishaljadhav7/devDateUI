import { useSelector } from "react-redux";
import EditProfile from "../components/EditProfile";
import { useDispatch } from "react-redux";
import { toggleEditProfileView } from "../utils/profileSlice";

const Profile = () => {
  const dispatch = useDispatch()
  const profile = useSelector((store) => store.profile)
  const user = useSelector((store) => store.user);

     

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 w-screen min-h-screen flex justify-center items-center p-6">
    {user && (
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Column: Profile Picture and Basic Info */}
        <div className="md:col-span-1 bg-gradient-to-br from-purple-600 to-indigo-600 p-8 flex flex-col items-center justify-center text-white">
          <img
            src={user?.photoURL}
            alt={`${user?.firstName} ${user?.lastName}`}
            className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-white shadow-2xl object-cover"
          />
          <h1 className="text-3xl font-bold mt-6 text-center">
            {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-gray-200 text-sm mt-2">{user?.emailId}</p>
          <p className="bg-white/20 text-white text-sm font-semibold px-6 py-1.5 rounded-full mt-4 shadow-sm">
            Developer
          </p>
          <button
            className="mt-8 px-6 py-2.5 bg-white text-purple-600 text-sm font-semibold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            onClick={() => dispatch(toggleEditProfileView(true))}
          >
            Edit Profile
          </button>
        </div>

        {/* Right Column: Skills, Contact, and About */}
        <div className="md:col-span-2 p-8">
          {/* Skills Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
            {user?.skills?.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {user?.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-purple-50 text-purple-700 px-5 py-2 text-sm font-medium rounded-full shadow-sm hover:shadow-md transition-shadow"
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
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Info</h2>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Email:</span> {user?.emailId}
            </p>
          </div>

          {/* About Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              <span className="font-semibold">Bio:</span> {user?.about || "No bio added yet."}
            </p>
          </div>
        </div>
      </div>
    )}

    {/* Edit Profile Modal */}
    {profile?.showEditProfile && <EditProfile />}
  </div>
  );
};

export default Profile;
