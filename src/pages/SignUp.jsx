import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUpSchema } from "../schemas/index";
import { useFormik } from "formik";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

const initialValues = {
  firstName: "",
  lastName: "",
  emailId: "",
  password: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmit, toggleSubmit] = useState(false);

  const { values, handleSubmit, errors, touched, handleBlur, handleChange } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      const { firstName, lastName, emailId, password } = values;
      try {
        setLoading(true);
        const res = await axios.post(
          BASE_URL + "/auth/signup",
          { firstName, lastName, emailId, password },
          { withCredentials: true },
        );

        dispatch(addUser(res.data.data));
        localStorage.setItem("token", res.data.token);
        return navigate("/profile");
      } catch (err) {
        setErrorMessage(err?.response?.data || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const canSubmit = Object.values(values).every((fieldValue) => Boolean(fieldValue));
    toggleSubmit(canSubmit);
  }, [values]);

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-purple-50 to-yellow-100 text-gray-800 py-16">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent"></div>
        <motion.div
          className="absolute top-0 left-0 w-3/4 h-1/2 bg-green-200/10 rounded-b-[100%] blur-3xl"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-purple-200/10 rounded-tl-[100%] blur-3xl"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mx-auto px-4 relative z-10"
      >
        <div className="bg-white bg-opacity-100 rounded-lg shadow-md p-6 max-w-lg mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-6"
          >
            <h1 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-purple-500 to-yellow-500 bg-clip-text text-transparent">
              Start Your DevDates Journey!
            </h1>
            <p className="text-base text-gray-600 mt-2 leading-relaxed font-normal">
              Connect with fellow IT pros. Sign up to find your perfect match!
            </p>
            <div className="w-12 h-1 bg-purple-500 mx-auto mt-3"></div>
          </motion.div>

          {/* Signup Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="h-[400px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-100 pr-2">
              <form className="space-y-3" onSubmit={handleSubmit}>
                {/* First Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder-gray-400 text-base"
                  />
                  {errors.firstName && touched.firstName && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.firstName}
                    </motion.p>
                  )}
                </div>

                {/* Last Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder-gray-400 text-base"
                  />
                  {errors.lastName && touched.lastName && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.lastName}
                    </motion.p>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Email</label>
                  <input
                    type="email"
                    name="emailId"
                    placeholder="Enter your email"
                    value={values.emailId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder-gray-400 text-base"
                  />
                  {errors.emailId && touched.emailId && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.emailId}
                    </motion.p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder-gray-400 text-base"
                  />
                  {errors.password && touched.password && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </div>

                {/* Sign Up Button */}
                <motion.button
                  type="submit"
                  disabled={!isSubmit || loading}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-yellow-500 text-white font-normal rounded-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 16px -4px rgba(168, 85, 247, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Signing Up...</span>
                    </div>
                  ) : (
                    "Sign Up"
                  )}
                </motion.button>

                {/* Sign In Link */}
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already a user?{" "}
                    <Link
                      to="/signin"
                      className="text-purple-500 font-normal hover:text-purple-600 transition-colors"
                    >
                      Sign In!
                    </Link>
                  </p>
                </div>

                {/* Error Message */}
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-100 border border-red-200 rounded-lg p-3 text-center"
                  >
                    <p className="text-red-500 text-sm">{errorMessage.message || errorMessage}</p>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;