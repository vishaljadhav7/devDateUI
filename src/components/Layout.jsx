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
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });
       dispatch(addUser(res?.data))
      } catch (error) {
        if(error.status === 400){
          navigate('/signin')
        }
      }
  } 

   useEffect(()=>{
    getUserInfo()
   }, [])

  return (
    <>
        <Navbar/>
        <Outlet/>
    </>
  )
}

export default Layout