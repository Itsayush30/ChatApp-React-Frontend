import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import { clearUser } from '../utils/userSlice';
const socket = io('http://localhost:1337'); 


const ChatComponent = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [recipient, setRecipient] = useState(''); 
    const user = useSelector((state) => state.user);
    const userId = user?.userName;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        
        if (userId) {
            socket.emit('register', userId);
        }

        socket.on('recvMsg', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]); 
        });

        return () => {
            socket.off('recvMsg');
        };
    }, [userId]);

    const sendMessage = () => {
        if (input.trim() && recipient.trim() && userId.trim()) {
            socket.emit('sendMsg', {
                senderId: userId,
                recipientId: recipient,
                msg: input
            });
            setInput('');
        }
    };

    return (
        <div className="flex flex-col h-screen p-4 bg-gray-100">
            <div className='flex justify-between'>
                <div className="mb-4 font-semibold font-serif ml-2">
                    UserName - {userId}
                </div>
                <div
                    onClick={() => {navigate('/'); dispatch(clearUser())}}
                    className="text-indigo-500 hover:underline cursor-pointer font-serif">
                    Logout
                </div>
            </div>
            <div className="flex-grow overflow-y-auto p-4 bg-white rounded shadow-md">
                <h2 className="text-2xl font-semibold text-blue-500 mb-4">Chat</h2>
                <div className="space-y-4">
                    {messages.map((message, index) => (
                        <div key={index} className="p-2 bg-gray-200 rounded">
                            <strong className="text-blue-600">{message.uid}:</strong> {message.msg}
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-4 flex">
                <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded-l"
                    placeholder="Add Recipient's UserName"
                />
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                    className="flex-grow p-2 border border-gray-300 rounded-l"
                    placeholder="Type Your Message..."
                />
                <button
                    onClick={sendMessage}
                    className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatComponent;
