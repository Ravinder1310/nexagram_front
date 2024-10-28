import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetAllMessage from '@/hooks/useGetAllMessage';
import useGetRTM from '@/hooks/useGetRTM';
import avatar from "./images/avatar.png"

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
        <div className='flex flex-col p-1 h-full bg-white'>
            {/* Show profile section only if there are no messages */}
            {!hasMessages && (
                <div className='flex justify-center mb-4'>
                    <div className='flex flex-col items-center justify-center pt-40'>
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
                            <AvatarFallback src={avatar} />
                        </Avatar>
                        <span>{selectedUser?.username}</span>
                        <Link to={`/profile/${selectedUser?._id}`}>
                            <Button className="h-8 my-2" variant="secondary">View profile</Button>
                        </Link>
                    </div>
                </div>
            )}
            <div className='flex flex-col gap-3 overflow-y-auto flex-1' style={{ scrollbarWidth: 'none', display: 'flex', flexDirection: 'column-reverse' }}>
                {/* Messages container is reversed in the flex direction but messages are still rendered in correct order */}
                <div className=''>
                    {messages && messages.map((msg, index) => {
                        const isSender = msg.senderId === user?._id;
                        const isDifferentSender = index === 0 || messages[index - 1].senderId !== msg.senderId;

                        return (
                            <div
                            key={msg._id}
                            className={`flex items-end ${isSender ? 'justify-end ' : 'justify-start'} ${isDifferentSender ? 'mt-5' : 'mt-1'}`}
                        >
                            {/* Show sender's avatar for received messages */}
                            {msg.senderId !== user?._id && selectedUser && (
                                <Avatar className="h-8 w-8 mr-2">
                                    <AvatarImage src={selectedUser.profilePicture} alt='profile' />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            )}
                        
                            <div
                                className={`p-2 max-w-[65%] break-words ${isSender ? 'bg-blue-500 text-white text-sm font-mono' : 'bg-gray-200 text-black text-sm font-mono'} 
                                    ${isSender ? 'rounded-tl-lg rounded-tr-lg rounded-bl-lg' : 'rounded-tl-lg rounded-tr-lg rounded-br-lg'}`}
                                style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
                            >
                                {msg.message}
                            </div>
                        
                            {/* Show recipient's avatar for sent messages */}
                            {isSender && user?.profilePicture && (
                                <Avatar className="h-8 w-8 ml-2">
                                    <AvatarImage src={user.profilePicture} alt='profile' />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                        
                        );
                    })}
                    {/* This div serves as the reference point to scroll to */}
                    <div ref={messagesEndRef}></div>
                </div>
            </div>
        </div>
    );
};

export default Messages;
