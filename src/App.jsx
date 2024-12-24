import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Core from "./components/Core";
import HeroSection from "./pages/HeroSection";
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile";
import Connections from "./pages/Connections";
import Requests from "./pages/Requests";
// import Footer from "./components/Footer";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Chat from "./pages/Chat";

function App() {

  const allRoutes = createBrowserRouter([
    {
      path : "/",
      element : <Layout/>,
      children : [
        {
          path : "/",
          element : <Core/>,
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
        },
        {
          path : "/chat/:toUserId",
          element : <Chat/>
        }
      ]
    }
  ])
  
  return (
    <>
        <Provider store={appStore}>
         <RouterProvider router={allRoutes}/>
        </Provider>
    </>
  )
}

export default App
