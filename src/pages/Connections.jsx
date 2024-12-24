import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";
import ShimmerLoader from '../components/Shimmer'


const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(false)

  const getConnectionInvites = async () => {
    try {
      setLoading(true)
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log("res.data.myConnections from connections ", res.data)
      dispatch(addConnections(res.data.data));
      setError(null); // Clear any previous error
    } catch (error) {
      setError("Failed to fetch connections. Please try again later.");
    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    // console.log("fetching connections")
    getConnectionInvites();
  }, []);

  if (error) {
    return (
      <h1 className="absolute top-0 bg-white w-screen h-screen flex justify-center items-center text-3xl text-red-700">
        {error}
      </h1>
    );
  }

  if (connections?.length === 0)
    return (
      <h1 className="absolute top-0 bg-white w-screen h-screen flex justify-center items-center text-3xl text-black">
        No Invites Found
      </h1>
    );

    if(loading){
        return <ShimmerLoader/>
    }

  return (
    <div className="absolute top-0 bg-white w-screen h-screen flex flex-col items-center pt-[25%] md:pt-[8%]">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Connections</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 md:px-10 overflow-y-scroll">
        {connections?.map((connection) => {
          if (!connection) return null;
          const { _id, firstName, lastName, photoURL} = connection;

          // console.log("key ", _id)

          return (
            <div
              key={_id}
              className="card bg-white shadow-xl p-4 rounded-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={photoURL}
                  alt={`${firstName} ${lastName}`}
                  className="w-16 h-16 rounded-full border border-gray-300 object-cover"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {firstName} {lastName}
                  </h2>
                </div>
              </div>
    
           <Link to={`/chat/${_id}`}>           
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors w-[100px]"
              >
                Chat
              </button>
           </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
