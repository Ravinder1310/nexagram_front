import React, { useEffect } from "react";
import { Heart, MessageCircle } from "lucide-react";
import main_logo from "./images/main_lg.png";
import { useNavigate } from "react-router-dom";

const TopNav = () => {

  const navigate = useNavigate();

    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Lobster&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }, []);

  return (
    <div className="fixed sm:hidden w-[100%] z-40">
      <div className="flex justify-between items-center bg-white py-2 shadow-md shadow-gray-300">
        <div className="flex items-center">
          <img src={main_logo} className="w-[50px]" alt="error" />
          <h1 className="text-2xl" style={{ fontFamily: "'Lobster', cursive" }}>
      <span className="text-pink-500">Nexa</span>
      <span className="text-blue-600">gram</span>
    </h1>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col items-cente hover:bg-pink-600 hover:text-white hover:cursor-pointer p-2 rounded-md">
            <div className=" text-md text-center">
              <Heart className="m-auto" />
            </div>
          </div>
          <div className="flex flex-col items-cente hover:bg-pink-600 hover:text-white hover:cursor-pointer p-2 rounded-md" onClick={() => {navigate("/chat")}}>
            <div className=" text-md text-center">
              <MessageCircle className="m-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
