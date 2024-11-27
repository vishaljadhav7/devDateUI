import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"; 
import { useEffect } from "react";
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';


const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((store) => store.user);

  const getUserInfo = async () => {
     if(userInfo) return
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
    
      //  console.log("res.data from layout ", res.data)
      console.log("fetching data again")

       dispatch(addUser(res.data))
      } catch (error) {
        console.log("error.status from layout ", error.status , error.status === 400)
        if(error.status === 400){
          navigate('/signin')
        }
      }
  } 

   useEffect(()=>{
    getUserInfo()
   }, [] )

  return (
    <div className=''>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Layout