import { Link } from "react-router-dom"

const SignIn = () => {
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
           <input type="email" placeholder="email" className="input input-bordered" required />
         </div>
 
         <div className="form-control">
           <label className="label">
             <span className="label-text">Password</span>
           </label>
           <input type="password" placeholder="password" className="input input-bordered" required />
         </div>
 
         <div className="flex items-center justify-between mt-2 gap-2">
           <button className="btn btn-primary w-[100px]">Login</button>
         <div className="mt-2">
         <p>New here? <Link to={"/signup"}><span className="text-teal-500 font-bold">Sign Up!</span> </Link></p>
         </div>
         </div>
       </form>
     </div>
   </div>
 </div>
 
  )
}

export default SignIn