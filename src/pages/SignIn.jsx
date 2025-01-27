import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BASE_URL } from "../utils/constants"
import axios  from "axios"
import { addUser } from "../utils/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


const initialValues = {
  emailId : "",
  password : ""
}

const SignIn = () => { 

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)
  const [userData, setUserData] = useState(initialValues)
  const [isSubmit, toggleSubmit] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    setUserData( prev => (
      {
        ...prev , [e.target.name] : e.target.value
      }
    ))
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    const {emailId, password} = userData
    try {
      const res = await axios.post(
        BASE_URL + "/auth/signin",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      localStorage.setItem("token", res.data.token);
      return navigate("/"); // takes us to the feed or core
    } catch (err) {
      setErrorMessage(err?.response?.data || "Something went wrong");
    }
  }



  useEffect(()=>{
     const canSubmit = Object.values(userData).every(value => Boolean(value))
     toggleSubmit(canSubmit)
  }, [userData])

 useEffect(()=>{
  if(user) {
    navigate("/")
   } 
 })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        {/* Welcome Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back, Dev!</h1>
          <p className="text-gray-600 mb-6">
            Great to see you again! Log in and continue connecting with fellow techies.
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="emailId"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
              onChange={handleChange}
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
              onChange={handleChange}
            />
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              onClick={handleSignIn}
              disabled={!isSubmit}
              className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Login
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600">
              New here?{' '}
              <Link to="/signup" className="text-indigo-600 font-semibold hover:underline">
                Sign Up!
              </Link>
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm text-center mt-4">{errorMessage.message}</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default SignIn