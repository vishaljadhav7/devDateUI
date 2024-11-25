import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    <div className="absolute top-0 bg-white w-screen min-h-screen">
      {user && 
        <div className="w-[100%] h-[100%] flex justify-center items-center">
           <h1>Hai Bhai User ne log in KIYA HAI</h1>
        </div>
       }
    </div>
  )
}

export default Profile