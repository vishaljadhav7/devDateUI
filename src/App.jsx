import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Feed from "./components/Feed";
import HeroSection from "./pages/HeroSection";
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile";
import Connections from "./pages/Connections";
import Requests from "./pages/Requests";

function App() {

  const allRoutes = createBrowserRouter([
    {
      path : "/",
      element : <Layout/>,
      children : [
        {
          path : "/",
          element : <Feed/>,
          children : [] 
        },
        {
          path : "/homePage",
          element : <HeroSection/>,
        },
        {
          path : "/signin",
          element : <SignIn/>
        },
        {
          path: "/signup",
          element : <SignUp/>
        },
        {
          path : "/profile",
          element : <Profile/>,
        },
        {
          path : "/connections",
          element : <Connections/>
        },
        {
          path : "/requests",
          element : <Requests/>
        }
      ]
    }
  ])
  
  return (
    <>
      <div className="w-screen ">
         <RouterProvider router={allRoutes}/>
      </div>
    </>
  )
}

export default App
