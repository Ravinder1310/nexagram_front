import React, { useEffect } from "react";
import { Heart, MessageCircle, Settings } from "lucide-react"; // Importing a settings icon
import main_logo from "./images/main_lgo.png";
import { useNavigate, useLocation } from "react-router-dom";

const TopNav = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current path

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
          <img src={main_logo} className="w-[40px]" alt="error" />
          <h1 className="text-2xl" style={{ fontFamily: "'Lobster', cursive" }}>
            <span className="text-black">Dazzle</span>
            <span className="text-orange-400 ml-1">Den</span>
          </h1>
        </div>
        <div className="flex gap-1">
          <div
            className="flex flex-col items-center hover:cursor-pointer p-2 rounded-md"
          >
            <div className=" text-md text-center">
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
