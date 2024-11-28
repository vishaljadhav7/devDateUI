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
  const [isSubmit, toggleSubmit] = useState(false)

  const { values, handleSubmit, errors, touched, handleBlur, handleChange } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      const {firstName, lastName, emailId, password} = values;
      try {
        const res = await axios.post(
          BASE_URL + "/auth/signup",
          { firstName, lastName, emailId, password },
          { withCredentials: true }
        );

        dispatch(addUser(res.data.userInfo)) 
        return navigate("/profile");
      } catch (err) {
        setErrorMessage(err?.response?.data || "Something went wrong");
      }
    },
  });
 
  useEffect(()=>{
  const canSubmit = Object.values(values).every(fieldValue => Boolean(fieldValue))

  toggleSubmit(canSubmit)

  }, [values])

  useEffect(()=>{
    if(user) {
      navigate("/")
     } 
   })

  return (
    <div className="hero bg-white absolute top-0 min-h-screen pt-[22%] md:pt-[7%]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up Now!</h1>
          <p className="py-6 hidden md:block text-black">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
    
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                name="firstName" // Updated to match schema
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="input input-bordered"
              />
              {errors.firstName && touched.firstName && (
                <p className="text-red-500 px-2 py-1">{errors.firstName}</p>
              )}
            </div>

   
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                name="lastName" // Updated to match schema
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="input input-bordered"
              />
              {errors.lastName && touched.lastName && (
                <p className="text-red-500 px-2 py-1">{errors.lastName}</p>
              )}
            </div>

       
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                name="emailId"
                value={values.emailId}
                onChange={handleChange}
                onBlur={handleBlur}
                className="input input-bordered"
              />
              {errors.emailId && touched.emailId && (
                <p className="text-red-500 px-2 py-1">{errors.emailId}</p>
              )}
            </div>

     
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="input input-bordered"
              />
              {errors.password && touched.password && (
                <p className="text-red-500 px-2 py-1">{errors.password}</p>
              )}
            </div>

      
            <div className="flex items-center justify-between mt-2 gap-2">
              <button 
              className="btn btn-primary md:w-[100px]" 
              type="submit"
              disabled={!isSubmit}
              >
                Sign Up
              </button>
              <div className="mt-2">
                <p>
                  Already a user?{" "}
                  <Link to="/signin">
                    <span className="text-teal-500 font-bold">Sign In!</span>
                  </Link>
                </p>
              </div>
            </div>
            {errorMessage && <p className="text-red-500 px-2 py-1">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
