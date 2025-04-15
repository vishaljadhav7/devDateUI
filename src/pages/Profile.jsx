import { useSelector } from "react-redux";
import EditProfile from "../components/EditProfile";
import { useDispatch } from "react-redux";
import { toggleEditProfileView } from "../utils/profileSlice";
import { motion } from "framer-motion";

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((store) => store.profile);
  const user = useSelector((store) => store.user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-purple-50 to-yellow-100 flex justify-center items-center py-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent"></div>
        <div className="absolute top-0 left-0 w-3/4 h-1/2 bg-green-200/10 rounded-b-[100%] blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-purple-200/10 rounded-tl-[100%] blur-3xl" />
      </div>

      {user && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03, rotate: 0.5, boxShadow: "0 8px 20px rgba(168, 85, 247, 0.2)" }}
          transition={{ duration: 0.3 }}
          className="relative   px-4 sm:px-2 bg-white rounded-lg shadow-md p-4 w-[75%] md:w-[50%] group "
        >
          {/* Corner Accent */}
          <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-yellow-500 rounded-br-full opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Profile Picture and Basic Info */}
            <div className="flex flex-col items-center p-4">
              <motion.img
                src={user?.photoURL}
                alt={`${user?.firstName} ${user?.lastName}`}
                className="w-24 h-24 rounded-full border-2 border-purple-500/20 object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <h1 className="text-lg md:text-xl font-medium text-gray-800 mt-4 text-center">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-base font-normal text-gray-600 mt-1">{user?.emailId}</p>
              <motion.button
                className="relative mt-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 text-base font-normal shadow-md overflow-hidden group/button"
                onClick={() => dispatch(toggleEditProfileView(true))}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 4px 15px rgba(168, 85, 247, 0.4)",
                  backgroundPosition: "100% 0",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                style={{ backgroundSize: "200% 100%", backgroundPosition: "0 0" }}
              >
                <span className="relative z-10">Edit Profile</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </div>

            {/* Skills, Contact, and About */}
            <div className="p-4">
              {/* Skills Section */}
              <div className="mb-4">
                <h2 className="text-xl font-medium text-gray-800 mb-2">Skills</h2>
                {user?.skills?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user?.skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        className="bg-gradient-to-r from-purple-500 to-yellow-500 text-white text-xs font-normal px-2 py-1 rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.1, rotate: 3 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                ) : (
                  <p className="text-base font-normal text-gray-600">
                    No skills added yet. Update your profile to add skills.
                  </p>
                )}
              </div>

              {/* Contact Section */}
              <div className="mb-4">
                <h2 className="text-xl font-medium text-gray-800 mb-2">Contact Info</h2>
                <p className="text-base font-normal text-gray-600">
                  <span className="font-medium">Email:</span> {user?.emailId}
                </p>
              </div>

              {/* About Section */}
              <div>
                <h2 className="text-xl font-medium text-gray-800 mb-2">About</h2>
                <p className="text-base font-normal text-gray-600">
                  <span className="font-medium">Bio:</span> {user?.about || "No bio added yet."}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Edit Profile Modal */}
      {profile?.showEditProfile && <EditProfile />}
    </div>
  );
};

export default Profile;