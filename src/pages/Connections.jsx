import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";
import ShimmerLoader from '../shimmer/ShimmerLoader'


const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(false)

  const getConnectionInvites = async () => {
    try {
      setLoading(true)
      const res = await axios.get(BASE_URL + "/user/connections", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });
      dispatch(addConnections(res.data.data));
      setError(null); 
    } catch (error) {
      setError("Failed to fetch connections. Please try again later.");
    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    if(connections?.length) return
    getConnectionInvites();
  }, []);

  if (error) {
    return (
      <h1 className=" bg-white w-screen h-screen flex justify-center items-center text-3xl text-red-700">
        {error}
      </h1>
    );
  }

    if(loading){
        return <ShimmerLoader type="connection"/>
    }
 
    if (connections?.length === 0)
      return (
        <h1 className=" bg-white w-screen h-screen flex justify-center items-center text-3xl text-black">
          No Invites Found
        </h1>
      );


  return (
    <div className=" bg-white w-screen h-screen flex flex-col items-center pt-[25%] md:pt-[8%]">
  <h1 className="text-3xl font-bold text-gray-800 mb-8">Connections</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 md:px-10 overflow-y-auto">
    {connections?.map((connection) => {
      if (!connection) return null;
      const { _id, firstName, lastName, photoURL } = connection;

      return (
        <div
          key={_id}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex items-center space-x-4">
            <img
              src={photoURL}
              alt={`${firstName} ${lastName}`}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {firstName} {lastName}
              </h2>
            </div>
          </div>
          <Link to={`/chat/${_id}`}>
            <button className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
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
