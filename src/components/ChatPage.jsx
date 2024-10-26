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
import backLogo from "./images/back4.png";
import avatar from "./images/avatar.png";
import { FaArrowLeft } from "react-icons/fa";

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
        `${import.meta.env.VITE_API_URL}/api/v1/message/send/${receiverId}`,
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
        <section className="flex-1 flex flex-col h-screen z-50 mb-40 sm:w-[100px] sm:ml-40">
          <div className="flex gap-3 items-center px-1 py-[10px] border-b border-gray-300 sticky top-0 bg-blue-500 z-10">
            <div className="rounded-[50%] bg-blue-500 p-1 shadow-xl shadow-">
              <FaArrowLeft onClick={handleBackClick} className="text-white" />
            </div>
            <Link
              to={`/profile/${selectedUser?._id}`}
              className="flex items-center gap-2"
            >
              {selectedUser?.profilePicture ? (
                <img
                  src={selectedUser?.profilePicture}
                  className="w-10 h-10 rounded-[50%]"
                />
              ) : (
                <img
                  src={avatar}
                  alt="error"
                  className="w-10 h-10 rounded-[50%]"
                />
              )}

              <h1 className=" text-xl text-white font-mono">
                {selectedUser?.username}
              </h1>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto bg-blue-200">
            <Messages selectedUser={selectedUser} />
          </div>
          <div className="flex items-center py-4 px-1 bg-blue-200 relative">
            <Input
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              type="text"
              className="flex-1 focus-visible:ring-transparent rounded-[20px] pr-14 bg-white bg-opacity-50 backdrop-blur-md border border-gray-300"
              placeholder="Messages..."
            />
            <img
              className="absolute right-4 cursor-pointer w-9 h-9"
              onClick={() => sendMessageHandler(selectedUser?._id)}
              src={sendLogo}
              alt="Send"
            />
          </div>
        </section>
      ) : (
        <section className="w-full h-full p-0 pt-20 sm:pt-10 sm:ml-60">
          <h1 className="font-bold text-xl ml-4">{user?.username}</h1>
          <div
            className="flex p-2 gap-2 overflow-x-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // For Firefox and IE/Edge
          >
            <style>
              {`
      /* Hide scrollbar for Chrome, Safari, and Opera */
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
    `}
            </style>
            {allUsers?.map((singleUser) => {
              const isOnline = onlineUsers.includes(singleUser?._id); // Check if the user is online
              return (
                <div
                  className="text-center w-[80px] h-[110px] flex-shrink-0 relative"
                  key={singleUser?._id}
                >
                  <div className="relative inline-block">
                    <Avatar className="w-14 h-14 m-auto">
                      <AvatarImage src={singleUser?.profilePicture} />
                      <AvatarFallback src={avatar} />
                    </Avatar>
                    {/* Green circle for online users */}
                    {isOnline && (
                      <span className="absolute bottom-0 right-0 block h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  <h1 className="font-semibold text-sm">
                    {singleUser?.username}
                  </h1>
                </div>
              );
            })}
          </div>

          <div className="overflow-y-auto h-[80vh]">
            <h1 className="ml-4 mt-4 mb-2 font-bold">Messages</h1>
            {suggestedUsers?.length > 0 ? (
              suggestedUsers?.map((suggestedUser) => {
                const isOnline = onlineUsers.includes(suggestedUser?._id);
                return (
                  <div
                    onClick={() => handleUserClick(suggestedUser)}
                    className="flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer"
                    key={suggestedUser?._id}
                  >
                    <div className="relative inline-block">
                      <Avatar className="w-14 h-14">
                        <AvatarImage src={suggestedUser?.profilePicture} />
                        <AvatarFallback src={avatar} />
                      </Avatar>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-mono">
                        {suggestedUser?.username}
                      </span>
                      <span
                        className={`text-xs ${
                          isOnline ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {isOnline ? "Active" : "offline"}
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
