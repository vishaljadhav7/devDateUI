import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";
import ShimmerLoader from "../shimmer/ShimmerLoader";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getConnectionInvites = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/user/connections", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(addConnections(res.data.data));
      setError(null);
    } catch (error) {
      setError("Failed to fetch connections. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (connections?.length) return;
    getConnectionInvites();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-purple-50 to-yellow-100">
        <h1 className="text-3xl font-semibold text-red-500 bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
          {error}
        </h1>
      </div>
    );
  }

  if (loading) {
    return <ShimmerLoader type="connection" />;
  }

  if (connections?.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-purple-50 to-yellow-100">
        <h1 className="text-3xl font-semibold text-gray-800 bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
          No Invites Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-purple-50 to-yellow-100 flex flex-col items-center ">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent"></div>
        <div className="absolute top-0 left-0 w-3/4 h-1/2 bg-green-200/10 rounded-b-[100%] blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-purple-200/10 rounded-tl-[100%] blur-3xl" />
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-2 relative z-10">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 text-center mb-6">
          Your Connections
        </h1>

        {/* Masonry Grid */}
        <div className="h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-100 columns-1 md:columns-2 lg:columns-3 gap-4">
          <div className="absolute left-1/2 -translate-x-1/2 h-full border-l-2 border-purple-500/20 z-0"></div>
          {connections?.map((connection) => {
            if (!connection) return null;
            const { _id, firstName, lastName, photoURL } = connection;

            return (
              <div
                key={_id}
                className="bg-white rounded-lg shadow-md p-4 mb-4 break-inside-avoid hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative z-10 w-full max-w-sm mx-auto"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={photoURL}
                    alt={`${firstName} ${lastName}`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/20"
                  />
                  <div>
                    <h2 className="text-lg md:text-xl font-medium text-gray-800">
                      {firstName} {lastName}
                    </h2>
                    <span className="inline-block px-2 py-1 text-xs font-normal text-white bg-slate-400 backdrop-blur-2xl rounded-full">
                      Online
                    </span>
                  </div>
                </div>
                <Link to={`/chat/${_id}`}>
                  <button className="mt-4 w-full bg-slate-400 backdrop-blur-2xl text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300 text-base font-normal shadow-md">
                    Chat
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;