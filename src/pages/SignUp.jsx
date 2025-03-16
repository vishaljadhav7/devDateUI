import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUpSchema } from '../schemas/index';
import { useFormik } from 'formik';
import axios from "axios";
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';


const initialValues = {
  firstName: "",
  lastName: "",
  emailId: "",
  password: "",
};

const SignUp = () => {
  const navigate = useNavigate() 
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)
  const [errorMessage, setErrorMessage] = useState('') 
  const [loading, setLoading] = useState(false)
  const [isSubmit, toggleSubmit] = useState(false)

  const { values, handleSubmit, errors, touched, handleBlur, handleChange } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      const {firstName, lastName, emailId, password} = values;
      try {
        setLoading(true)
        const res = await axios.post(
          BASE_URL + "/auth/signup",
          { firstName, lastName, emailId, password },
          { withCredentials: true }
        );

        dispatch(addUser(res.data.data)) 
        localStorage.setItem("token", res.data.token);
        return navigate("/profile");
      } catch (err) {
        setErrorMessage(err?.response?.data || "Something went wrong");
      } finally {
        setLoading(false)
      }
    },
  });
 
  useEffect(()=>{
  const canSubmit = Object.values(values).every(fieldValue => Boolean(fieldValue))

  toggleSubmit(canSubmit)

  }, [values])

  const validForm = () => {
    return (
      Boolean(values.firstName &&
        values.emailId &&
        values.password &&
        values.lastName
      )
    )
  }

  useEffect(()=>{
    if(user) {
      navigate("/profile")
     } 
   })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 pt-[8%]">
    <div className="w-full max-w-4xl mx-4 bg-white rounded-lg shadow-xl overflow-hidden md:flex md:flex-row-reverse">
      {/* Welcome Section */}
      <div className="p-8 md:p-12 md:w-1/2 bg-gradient-to-r from-purple-100 to-indigo-100">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Start Your DevDates Journey Today!</h1>
        <p className="text-gray-600 hidden md:block">
          Ready to connect with fellow IT pros? Sign up now and find your perfect match!
        </p>
      </div>

      {/* Signup Form Section */}
      <div className="p-8 md:p-12 md:w-1/2">
        <div className="h-[500px] overflow-y-auto"> {/* Fixed height with scrollable content */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* First Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.firstName && touched.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.lastName && touched.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="emailId"
                placeholder="Enter your email"
                value={values.emailId}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.emailId && touched.emailId && (
                <p className="text-red-500 text-sm mt-1">{errors.emailId}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.password && touched.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Sign Up Button */}
            <div>
              <button
                type="submit"
                disabled={!isSubmit || loading}
                className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "loading..." : "Sign Up"}
              </button>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Already a user?{' '}
                <Link to="/signin" className="text-indigo-600 font-semibold hover:underline">
                  Sign In!
                </Link>
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-sm text-center mt-4">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SignUp;
