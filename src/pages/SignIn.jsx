import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BASE_URL } from "../utils/constants"
import axios  from "axios"
import { addUser } from "../utils/userSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"


const initialValues = {
  emailId : "",
  password : ""
}

const SignIn = () => { 

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userData, setUserData] = useState(initialValues)
  const [submit, toggleSubmit] = useState(false)
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
      dispatch(addUser(res.data.userInfo));
      return navigate("/profile"); // takes us to the feed or core
    } catch (err) {
      setErrorMessage(err?.response?.data || "Something went wrong");
    }
  }



  useEffect(()=>{
     const canSubmit = Object.values(userData).every(value => Boolean(value))
     toggleSubmit(canSubmit)
  }, [userData])

  return (
    <div className="hero bg-white absolute top-0 min-h-screen pt-[10%] md:pt-[5%] ">
    <div className="hero-content flex-col lg:flex-row-reverse ">
     <div className="text-center lg:text-left">
       <h1 className="text-5xl font-bold">Sign In Now!</h1>
       <p className="py-6 hidden md:block text-black">
         Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
         quasi. In deleniti eaque aut repudiandae et a id nisi.
       </p>
     </div>
 
     <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl ">
       <form className="card-body">

         <div className="form-control">
           <label className="label">
             <span className="label-text">Email</span>
           </label>
           <input 
           type="email" 
           placeholder="email"
           name="emailId" 
           className="input input-bordered" 
           required 
           onChange={handleChange}
           />
         </div>
 
         <div className="form-control">
           <label className="label">
             <span className="label-text">Password</span>
           </label>
           <input 
           type="password" 
           placeholder="password" 
           className="input input-bordered"
           name="password" 
           required 
           onChange={handleChange}
           />
         </div>
 
         <div className="flex items-center justify-between mt-2 gap-2">
           <button 
           className="btn btn-primary w-[100px]"
           onClick={handleSignIn}
           type="submit"
           disabled={!submit}
           >
            Login
          </button>
         <div className="mt-2">
         <p>New here? <Link to={"/signup"}><span className="text-teal-500 font-bold">Sign Up!</span> </Link></p>
         </div>
         
       </div>
       {errorMessage && <p className="text-red-500 px-2 py-1">{errorMessage.message}</p>}
       </form>
     </div>
   </div>
 </div>
 
  )
}

export default SignIn