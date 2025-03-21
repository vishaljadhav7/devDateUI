import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { useWebSocketContext } from '../context/WebSocketContext';
import { useSelector } from 'react-redux';
import ShimmerLoader from '../shimmer/ShimmerLoader';

const Chat = () => {
    const { toUserId } = useParams();
    const user = useSelector(store => store.user);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const { socket } = useWebSocketContext();
    const [participants, setParticipants] = useState();
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('');
 
    const [reciever, setReciever] = useState('');
    // Send Message
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
               Authorization: `Bearer ${localStorage.getItem('token')}`
             },
          }
        );
        const newMessage = { message, senderId: user._id, createdAt: new Date().toISOString() }
        setMessages((prev) => (Array.isArray(prev) ? [...prev, newMessage] : [newMessage]));
        setMessage('');
      } catch (error) {
        setErrorMsg(error);
      }
    };

    // Fetch Messages
    const getMessages = async () => {
       setLoading(true)
      try {
        const res = await axios.get(`${BASE_URL}/chat/get-message/${toUserId}`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });
        setParticipants(res?.data.data.participants);
        setMessages(res?.data.data.messages);
      } catch (error) {
          setErrorMsg(error);
      }finally{
       setLoading(false)
      }
    };

    useEffect(() => {
      if (!user?._id || !toUserId || !socket) return;

      socket.emit('join', { userId: user._id });

      getMessages(); 

      const handleNewMessage = (data) => {
          setMessages(prev => [...prev, data]);
      };

      socket.on('new-message', handleNewMessage);
      return () => {
          socket.off('new-message', handleNewMessage);
      };
    }, [user?._id, toUserId, socket]);

    useEffect(()=>{
        const receiverInfo = participants?.find((participant) => {
            if (participant) {
                return user._id !== participant._id;
            }
        });

        setReciever(receiverInfo)

    }, [participants])

    if(loading){
      return <ShimmerLoader type='chat'/>
    }


    return (
<div className=" bg-gray-100 w-screen h-screen flex flex-col justify-center items-center gap-4 p-4">
  <div className="h-full w-full max-w-4xl bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden mt-16">
  
    <div className="bg-blue-600 text-white py-4 px-6 text-xl font-bold flex items-center gap-4">
      {reciever?.photoURL && (
        <img
          src={reciever.photoURL}
          alt="Receiver"
          className="w-10 h-10 rounded-full border-2 border-white"
        />
      )}
      Chat with {reciever?.firstName || 'User'}
    </div>

    {/* Chat Messages */}
    <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50">
      {messages?.length > 0 ? (
        messages.map((chat, index) => (
          <div
            key={index}
            className={`chat ${chat?.senderId === user?._id ? 'chat-end' : 'chat-start'}`}
          >
            {/* Chat Image */}
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

            {/* Chat Header */}
            <div className="chat-header">
              {chat.senderId === user._id
                ? `${user?.firstName} ${user?.lastName}`
                : `${reciever?.firstName} ${reciever?.lastName}`}
              <time className="text-xs opacity-50 ml-2">
                {new Date(chat.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </time>
            </div>

     
            <div
              className={`chat-bubble ${
                chat.senderId === user._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {chat.message}
            </div>

            <div className="chat-footer opacity-50">
              {chat.senderId === user._id ? 'Delivered' : 'Seen'}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 mt-20">
          No messages yet. Start the conversation!
        </div>
      )}
    </div>

   
    <div className="bg-gray-200 p-4 flex gap-2 border-t">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      />
      <button
        onClick={sendMessage}
        className="btn btn-primary px-6 py-2 rounded-lg"
      >
        Send
      </button>
    </div>
  </div>
</div>
    );
};

export default Chat;
