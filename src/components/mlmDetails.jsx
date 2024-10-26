import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import investLogo from "./images/invest.png"
import { motion } from "framer-motion";



const AnimatedBorderBox = ({ children }) => (
  <div className="relative p-[3px] rounded-lg overflow-hidden mt-10">
    {/* Rotating Background */}
    <motion.div
      className="absolute inset-0 -z-10"
      animate={{ rotate: 360 }} // Only the background rotates
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      style={{
        background: "conic-gradient(from 0deg, #ffd700, #ffac00, #ff6700, #ffd700)",
        backgroundSize: "200% 200%", // Smooth transition of colors
        borderRadius: "inherit", // Matches parent border radius
      }}
    />

    {/* Inner Content with Corner Borders */}
    <div className="relative p-4 bg-white text-black rounded-lg z-10">
      {children}
      
      {/* Corner Borders */}
      <span className="absolute top-0 left-0 w-[8px] h-[8px] bg-gradient-to-r from-red-500 to-orange-500"></span>
      <span className="absolute top-0 right-0 w-[8px] h-[8px] bg-gradient-to-r from-red-500 to-orange-500"></span>
      <span className="absolute bottom-0 left-0 w-[8px] h-[8px] bg-gradient-to-r from-red-500 to-orange-500"></span>
      <span className="absolute bottom-0 right-0 w-[8px] h-[8px] bg-gradient-to-r from-red-500 to-orange-500"></span>
    </div>
  </div>
);

const MlmDetails = () => {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [invitationLink, setInvitationLink] = useState("");
  const { user } = useSelector((store) => store.auth);

  const generateInvitationLink = () => {
    const link = `${window.location.origin}/signup?referral=${user.username}`;
    setInvitationLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(invitationLink);
    setIsLinkCopied(true);
    toast("Invitation link copied to clipboard!", {
      duration: 4000,
      position: "top-center",
      style: {
        background: "white",
        color: "black",
      },
      icon: "👏",
    });

    setTimeout(() => {
      setIsLinkCopied(false);
    }, 2000);
  };

  useEffect(() => {
    generateInvitationLink();
  }, []);

  return (
    <div className="pt-20 pb-20 px-3">
      <Toaster />
      <div className="flex flex-wrap gap-y-3 justify-between">
       <div className="w-[49%] bg-gradient-to-b from-orange-600 to-yellow-500 rounded-lg px-4 py-1 text-white">
        <p className="font-semibold">$0.00</p>
        <h1 className="font-semibold text-sm">Total Income</h1>
       </div>
       <div className="w-[49%] bg-gradient-to-b from-orange-600 to-yellow-500 rounded-lg px-4 py-1 text-white">
       <p className="font-semibold">$0.00</p>
       <h1 className="font-semibold text-sm">Direct Bonus</h1>
       </div>
       <div className="w-[49%] bg-gradient-to-b from-orange-600 to-yellow-500 rounded-lg px-4 py-1 text-white">
       <p className="font-semibold">$0.00</p>
       <h1 className="font-semibold text-sm">Royality</h1>
       </div>
       <div className="w-[49%] bg-gradient-to-b from-orange-600 to-yellow-500 rounded-lg px-4 py-1 text-white">
       <p className="font-semibold">$0.00</p>
       <h1 className="font-semibold text-sm">Team Strength</h1>
       </div>
       <div className="w-[49%] bg-gradient-to-b from-orange-600 to-yellow-500 rounded-lg px-4 py-1 text-white">
       <p className="font-semibold">$0.00</p>
       <h1 className="font-semibold text-sm">Team Business</h1>
       </div>
       <div className="w-[49%] bg-gradient-to-b from-orange-600 to-yellow-500 rounded-lg px-4 py-1 text-white">
       <p className="font-semibold">$0.00</p>
       <h1 className="font-semibold text-sm">Rewards</h1>
       </div>
      </div>
      <AnimatedBorderBox>
        <h1 className="font-bold text-xl text-center">Your Invitation Link</h1>
        <div className=" text-center mt-2 px-2 py-6 rounded-lg shadow-xl shadow-gray-300">
          <div className="w-[80%] m-auto">
            <span className="">{invitationLink}</span>
            
          </div>
          <button
              className={` w-[80%] font-mono text-xl rounded-full bg-gradient-to-r mt-4 from-red-400 to-red-600 text-white px-3 py-1 ${
                isLinkCopied ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={copyToClipboard}
              disabled={isLinkCopied}
            >
              {isLinkCopied ? "Copied!" : "Copy"}
            </button>
        </div>
        </AnimatedBorderBox>
    </div>
  );
};

export default MlmDetails;
