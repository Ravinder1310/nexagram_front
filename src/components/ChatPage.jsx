import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setSelectedUser } from "@/redux/authSlice";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MessageCircleCode } from "lucide-react";
import Messages from "./Messages";
import axios from "axios";
import { Link } from "react-router-dom";
import { setMessages } from "@/redux/chatSlice";
import useGetAllUsers from "@/hooks/useGetAllUsers";
import sendLogo from "./images/message2.png";
import backLogo from "./images/back2.png"

const ChatPage = () => {
  const [textMessage, setTextMessage] = useState("");
  const [showChat, setShowChat] = useState(false); // New state to toggle chat view
  const { user, suggestedUsers, selectedUser } = useSelector(
    (store) => store.auth
  );
  const { onlineUsers, messages } = useSelector((store) => store.chat);
  const dispatch = useDispatch();
  useGetAllUsers();
  const { allUsers } = useSelector((store) => store.auth);

  const sendMessageHandler = async (receiverId) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/message/send/${receiverId}`,
        { textMessage },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setMessages([...messages, res.data.newMessage]));
        setTextMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };    

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, []);

  const handleUserClick = (user) => {
    dispatch(setSelectedUser(user));
    setShowChat(true); // Show chat when a user is selected
  };

  const handleBackClick = () => {
    dispatch(setSelectedUser(null));
    setShowChat(false); // Show message list when back button is clicked
  };

  return (
    <div className="flex h-screen">
      {showChat && selectedUser ? (
        <section className="flex-1 flex flex-col h-[600px] pt-14 mb-40 sm:w-[100px] sm:ml-40">
          <div className="flex gap-3 items-center px-1 py-[10px] border-b border-gray-300 sticky top-0 bg-blue-500 z-10">
            {/* <button onClick={handleBackClick} className="">
              ◀️
            </button> */}
            <img onClick={handleBackClick}  src={backLogo} alt="error" className="w-7 rounded-[50%]"/>
            <Link to={`/profile/${selectedUser?._id}`}>
              <h1 className=" text-xl text-white">{selectedUser?.username}</h1>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto bg-blue-500">
            <Messages selectedUser={selectedUser} />
          </div>
          <div className="flex items-center py-4 px-1 bg-blue-500 relative">
            <Input
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              type="text"
              className="flex-1 focus-visible:ring-transparent rounded-[20px] pr-14 bg-white bg-opacity-50 backdrop-blur-md border border-gray-300" // Added semi-transparent white background and backdrop blur
              placeholder="Messages..."
            />

            <img
              className="absolute right-4 cursor-pointer w-9 h-9" // Adjust size as needed
              onClick={() => sendMessageHandler(selectedUser?._id)}
              src={sendLogo}
              alt="Send"
            />
          </div>
        </section>
      ) : (
        <section className="w-full h-full p-0 pt-20 sm:pt-10 sm:ml-60">
          <h1 className="font-bold text-xl ml-4">{user?.username}</h1>
          <div className="flex p-2 overflow-x-auto scrollbar-hide">
            {allUsers.map((singleUser) => {
              return (
                <div className="text-center min-w-[80px] h-[90px] flex-shrink-0">
                  <Avatar className="w-14 h-14 m-auto">
                    <AvatarImage src={singleUser?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h1 className="font-semibold text-sm">
                    {singleUser?.username}
                  </h1>
                </div>
              );
            })}
          </div>

          {/* <hr className='mb-4 border-gray-300' /> */}
          <div className="overflow-y-auto h-[80vh]">
            <h1 className="ml-4 mt-4 mb-2 font-bold">Messages</h1>
            {suggestedUsers.length > 0 ? (
              suggestedUsers.map((suggestedUser) => {
                const isOnline = onlineUsers.includes(suggestedUser?._id);
                return (
                  <div
                    onClick={() => handleUserClick(suggestedUser)}
                    className="flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer"
                  >
                    <Avatar className="w-14 h-14">
                      <AvatarImage src={suggestedUser?.profilePicture} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {suggestedUser?.username}
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          isOnline ? "text-green-600" : "text-red-600"
                        } `}
                      >
                        {isOnline ? "online" : "offline"}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center mx-auto">
                <MessageCircleCode className="w-32 h-32 my-4" />
                <h1 className="font-medium">Your messages</h1>
                <span>Send a message to start a chat.</span>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default ChatPage;
