import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { useWebSocketContext } from '../context/WebSocketContext';
import { useSelector } from 'react-redux';

const Chat = () => {
    const { toUserId } = useParams();
    const user = useSelector(store => store.user);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const { socket } = useWebSocketContext();
    const [participants, setParticipants] = useState();
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
            setMessages( (prev) => [...prev, { message, senderId: user._id, createdAt: new Date().toISOString() }]); 
            setMessage('');
        } catch (error) {
            setErrorMsg(error);
        }
    };

    // Fetch Messages
    const getMessages = async () => {
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

    return (
        <div className="absolute top-0 bg-gray-100 w-screen h-screen flex flex-col justify-center items-center gap-4 p-4">
            <div className="h-full w-full max-w-4xl bg-white rounded-lg shadow-lg flex flex-col overflow-hidden mt-16">
                <div className="bg-blue-600 text-white py-4 px-6 text-xl font-bold flex items-center gap-4">
                    {reciever?.photoURL && (
                        <img src={reciever.photoURL} alt="Receiver" className="w-10 h-10 rounded-full border border-gray-200" />
                    )}
                    Chat with {reciever?.firstName || 'User'}
                </div>
                <div className="flex-1 p-4 overflow-y-scroll space-y-4 bg-gray-50">
                    {messages?.length > 0 ? (
                        messages.map((chat, index) => (
                            <div key={index} className={`flex items-end ${chat.senderId === user._id ? 'justify-end' : 'justify-start'} gap-2`}> 
                                {chat.senderId !== user._id && reciever?.photoURL && (
                                    <img src={reciever.photoURL} alt="Receiver" className="w-8 h-8 rounded-full border border-gray-200" />
                                )}
                                <div className={`p-3 rounded-lg shadow-md max-w-md text-white ${chat.senderId === user._id ? 'bg-blue-500' : 'bg-gray-600'}`}>
                                    {chat.message}
                                    <div className="text-xs text-gray-300 mt-1 text-right">
                                        {new Date(chat.createdAt).toLocaleString()}
                                    </div>
                                </div>
                                {chat.senderId === user._id && user?.photoURL && (
                                    <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full border border-gray-200" />
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 mt-20">No messages yet. Start the conversation!</div>
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
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
