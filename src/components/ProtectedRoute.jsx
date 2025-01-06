import { useSelector } from "react-redux"
import HeroSection from "../pages/HeroSection";

const ProtectedRoute = ({children}) => {
    const user = useSelector(store => store.user);


  return (
     <>
      {user ? children : <HeroSection/> }
     </>
  )
}

export default ProtectedRoute;