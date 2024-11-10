import React, { useEffect, useState } from "react";
import { Heart, MessageCircle, Settings } from "lucide-react"; // Importing a settings icon
import main_logo from "./images/main_lgo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { clearLikeNotifications } from "@/redux/rtnSlice";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import avatar from "./images/avatar.png";

const TopNav = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current path
  const dispatch = useDispatch();
  const { likeNotification } = useSelector(
    (store) => store.realTimeNotification
  );
  const [notificationOpen, setNotificationOpen] = useState(false);

const notificationHandler = () => {
  setNotificationOpen(!notificationOpen);
            // Only clear notifications when closing the notification popover
            if (notificationOpen) {
                dispatch(clearLikeNotifications());
            }
}

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Lobster&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div className="fixed sm:hidden w-[100%] z-40">
      <div className="flex justify-between items-center bg-white py-2 shadow-md shadow-gray-300">
        <div className="flex items-center">
          {/* <img src={main_logo} className="w-[40px]" alt="error" /> */}
          <h1
            className="text-2xl ml-2"
            style={{ fontFamily: "'Lobster', cursive" }}
          >
            <span className="text-black">DazzleDen</span>
            {/* <span className="text-orange-400 ml-1"></span> */}
          </h1>
        </div>
        <div className="flex gap-1">
          <div className="flex flex-col items-center hover:cursor-pointer p-2 rounded-md">
            <div className=" text-md text-center" onClick={notificationHandler}>
              <Heart className="m-auto" />
            </div>
          </div>
          <div
            className="flex flex-col items-center hover:cursor-pointer p-2 rounded-md"
            onClick={() => {
              navigate("/chat");
            }}
          >
            <div className=" text-md text-center">
              <MessageCircle className="m-auto" />
            </div>
          </div>

          <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                className={`rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute ${
                  location.pathname.includes("profile")
                    ? " bottom-8 right-20"
                    : " bottom-8 right-10"
                }`}
              >
                {likeNotification.length}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='mt-10 rounded-xl bg-transparent backdrop-blur-2xl text-blue-500'>
              <div className="">
                {likeNotification.length === 0 ? (
                  <p>No new notifications</p>
                ) : (
                  likeNotification.map((notification) => (
                    <div
                      key={notification.userId}
                      className="flex items-center gap-2 my-2"
                    >
                      <Avatar>
                        <AvatarImage
                          src={notification.userDetails?.profilePicture}
                        />
                        <AvatarFallback src={avatar} />
                      </Avatar>
                      <p className="text-sm text-[#0d355b]">
                        <span className="font-bold">
                          {notification.userDetails?.username}
                        </span>{" "}
                        liked your post
                      </p>
                    </div>
                  ))
                )}
              </div>
            </PopoverContent>
          </Popover>

          {/* Conditionally render settings icon if "profile" exists in the URL */}
          {location.pathname.includes("profile") && (
            <div
              className="flex flex-col items-center hover:cursor-pointer p-2 rounded-md"
              onClick={() => {
                navigate("/settings"); // Navigate to the settings page
              }}
            >
              <div className=" text-md text-center">
                <Settings className="m-auto" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav;
