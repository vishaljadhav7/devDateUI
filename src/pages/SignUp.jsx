import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  
  const [userData, setUserData] = useState({})


  const handleFormData = (e) => {
    e.preventDefault();

    setUserData( (prev) => ( 
       {
        ...prev, [e.target.name] : e.target.value
      }
    ))
  }


  return ( 
  <div className="hero bg-white absolute top-0 min-h-screen pt-[22%] md:pt-[7%] ">
   <div className="hero-content flex-col lg:flex-row-reverse ">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Sign Up Now!</h1>
      <p className="py-6 hidden md:block text-black">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>

    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl ">
      <form className="card-body" onChange={handleFormData}>

      <div className="form-control">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input type="text" placeholder="first name"  name="firstname" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input type="text" placeholder="last name"  name="lastname" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" name="emailId" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" name="password" className="input input-bordered" required />
        </div>

        <div className="flex items-center justify-between mt-2 gap-2">
          <button className="btn btn-primary md:w-[100px] ">Login</button>
        <div className="mt-2">
        <p>Already a user? <Link to={"/signin"}><span className="text-teal-500 font-bold">Sign In!</span> </Link></p>
        </div>
        </div>
      </form>
    </div>
  </div>
</div>


  )
}

export default SignUp