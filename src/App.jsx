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
import { WebSocketProvider } from "./context/WebSocketContext";
import ProtectedRoute from './components/ProtectedRoute'

{/* <ProtectedRoute><Chat/></ProtectedRoute> */}

function App() {

  const allRoutes = createBrowserRouter([
    {
      path : "/",
      element : <Layout/>,
      children : [
        {
          path : "/",
          element :<ProtectedRoute><Core/></ProtectedRoute>, 
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
          element : <ProtectedRoute><Profile/></ProtectedRoute>,
        },
        {
          path : "/connections",
          element : <ProtectedRoute><Connections/></ProtectedRoute> 
        },
        {
          path : "/requests",
          element : <ProtectedRoute><Requests/></ProtectedRoute>
        },
        {
          path : "/chat/:toUserId",
          element : <ProtectedRoute><Chat/></ProtectedRoute>
        }
      ]
    }
  ])
  
  return (
    <>
      <WebSocketProvider>
        <Provider store={appStore}>
         <RouterProvider router={allRoutes}/>
        </Provider>
      </WebSocketProvider>
    </>
  )
}

export default App
