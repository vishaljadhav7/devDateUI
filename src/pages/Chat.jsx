import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useWebSocketContext } from "../context/WebSocketContext";
import { useSelector } from "react-redux";
import ShimmerLoader from "../shimmer/ShimmerLoader";
import { motion } from "framer-motion";

const Chat = () => {
  const { toUserId } = useParams();
  const user = useSelector((store) => store.user);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { socket } = useWebSocketContext();
  const [participants, setParticipants] = useState();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [reciever, setReciever] = useState("");

  const sendMessage = async () => {
    if (!message) return;
    try {
      await axios.post(
        `${BASE_URL}/chat/send-message/${toUserId}`,
        {
          senderId: user._id,
          receiverId: toUserId,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const newMessage = { message, senderId: user._id, createdAt: new Date().toISOString() };
      setMessages((prev) => (Array.isArray(prev) ? [...prev, newMessage] : [newMessage]));
      setMessage("");
    } catch (error) {
      setErrorMsg(error);
    }
  };

  const getMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/chat/get-message/${toUserId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setParticipants(res?.data.data.participants);
      setMessages(res?.data.data.messages);
    } catch (error) {
      setErrorMsg(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?._id || !toUserId || !socket) return;

    socket.emit("join", { userId: user._id });

    getMessages();

    const handleNewMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("new-message", handleNewMessage);
    return () => {
      socket.off("new-message", handleNewMessage);
    };
  }, [user?._id, toUserId, socket]);

  useEffect(() => {
    const receiverInfo = participants?.find((participant) => {
      if (participant) {
        return user._id !== participant._id;
      }
    });

    setReciever(receiverInfo);
  }, [participants]);

  if (loading) {
    return <ShimmerLoader type="chat" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-purple-50 to-yellow-100 flex flex-col justify-center items-center py-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent"></div>
        <div className="absolute top-0 left-0 w-3/4 h-1/2 bg-green-200/10 rounded-b-[100%] blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-purple-200/10 rounded-tl-[100%] blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl mx-auto px-4 sm:px-2 relative z-10 flex flex-col h-[calc(100vh-4rem)]"
      >
        <div className="bg-white rounded-lg shadow-md flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-md py-3 px-4 flex items-center gap-3 sticky top-0 z-10 border-b border-purple-500/20"
          >
            {reciever?.photoURL && (
              <img
                src={reciever.photoURL}
                alt="Receiver"
                className="w-8 h-8 rounded-full border-2 border-purple-500/20"
              />
            )}
            <h2 className="text-lg md:text-xl font-medium text-gray-800">
              Chat with {reciever?.firstName || "User"}
            </h2>
          </motion.div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-100 bg-gray-50/50 space-y-3">
            {messages?.length > 0 ? (
              messages.map((chat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`chat ${chat?.senderId === user?._id ? "chat-end" : "chat-start"}`}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full border-2 border-white">
                      <img
                        src={
                          chat.senderId === user._id
                            ? user?.photoURL || "https://via.placeholder.com/50"
                            : reciever?.photoURL || "https://via.placeholder.com/50"
                        }
                        alt={
                          chat.senderId === user._id
                            ? `${user?.firstName} ${user?.lastName}`
                            : `${reciever?.firstName} ${reciever?.lastName}`
                        }
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    {chat.senderId === user._id
                      ? `${user?.firstName} ${user?.lastName}`
                      : `${reciever?.firstName} ${reciever?.lastName}`}
                    <time className="text-xs opacity-50 ml-2">
                      {new Date(chat.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  </div>
                  <div
                    className={`chat-bubble ${
                      chat.senderId === user._id ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {chat.message}
                  </div>
                  <div className="chat-footer opacity-50">
                    {chat.senderId === user._id ? "Delivered" : "Seen"}
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center text-gray-500 mt-10"
              >
                No messages yet. Start the conversation!
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="bg-white p-3 border-t border-purple-500/20 shadow-md sticky bottom-0">
            <motion.div
              className="flex gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 rounded-lg border border-purple-500/20 bg-white text-base font-normal text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              />
              <motion.button
                onClick={sendMessage}
                className="btn btn-primary px-4 py-2 rounded-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Send
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Chat;