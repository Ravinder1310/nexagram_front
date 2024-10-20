import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetAllMessage from '@/hooks/useGetAllMessage';
import useGetRTM from '@/hooks/useGetRTM';

const Messages = ({ selectedUser }) => {
    useGetRTM();
    useGetAllMessage();
    const { messages } = useSelector((store) => store.chat);
    const { user } = useSelector((store) => store.auth);

    const hasMessages = messages && messages.length > 0;
    const messagesEndRef = useRef(null);

    // Function to scroll to the latest message
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className='flex flex-col p-4 h-full bg-blue-500'>
            {/* Show profile section only if there are no messages */}
            {!hasMessages && (
                <div className='flex justify-center mb-4'>
                    <div className='flex flex-col items-center justify-center'>
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span>{selectedUser?.username}</span>
                        <Link to={`/profile/${selectedUser?._id}`}>
                            <Button className="h-8 my-2" variant="secondary">View profile</Button>
                        </Link>
                    </div>
                </div>
            )}
            <div className='flex flex-col gap-3 overflow-y-auto flex-1' style={{ scrollbarWidth: 'none' }}>
                {messages && messages.map((msg) => (
                    <div key={msg._id} className={`flex ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'}`}>
                        {/* Show sender's avatar for received messages */}
                        {msg.senderId !== user?._id && selectedUser && (
                            <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={selectedUser.profilePicture} alt='profile' />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        )}
                        <div className={`p-2 rounded-[20px] max-w-xs break-words ${msg.senderId === user?._id ? 'bg-gradient-to-t from-violet-900 to-violet-600 text-white text-sm font-sans' : 'bg-white text-black text-sm font-sans'}`}>
                            {msg.message}
                        </div>
                        {/* Show recipient's avatar for sent messages */}
                        {msg.senderId === user?._id && user?.profilePicture && (
                            // <Avatar className="h-8 w-8 ml-2">
                            //     <AvatarImage src={user.profilePicture} alt='profile' />
                            //     <AvatarFallback>CN</AvatarFallback>
                            // </Avatar>
                            <></>
                        )}
                    </div>
                ))}
                {/* This div serves as the reference point to scroll to */}
                <div ref={messagesEndRef}></div>
            </div>
        </div>
    );
};

export default Messages;
