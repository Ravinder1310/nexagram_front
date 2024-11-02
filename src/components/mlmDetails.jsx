import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import investLogo from "./images/invest.png";
import { motion } from "framer-motion";

const AnimatedBorderBox = ({ children }) => (
  <div className="relative p-[3px] rounded-lg overflow-hidden mt-10">
    {/* Rotating Background */}
    <motion.div
      className="absolute inset-0 -z-10"
      animate={{ rotate: 360 }} // Only the background rotates
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      style={{
        background:
          "conic-gradient(from 0deg, #ffd700, #ffac00, #ff6700, #ffd700)",
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
    const link = `${window.location.origin}/invester-registration?referral=${user.referralCode}`;
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
        <div className=" text-center px-2 py-2 rounded-lg shadow-xl shadow-gray-300">
          <div className="w-[80%] m-auto">
            <span className="font-bold text-sm text-gray-500">
              {invitationLink}
            </span>
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
      <div
        className="mt-8 shadow-lg shadow-gray-300 p-4 py-6 border-2 rounded-lg border-gray-200"
        style={{
          backgroundImage: "url('/images/social.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "200px", // Set an appropriate height
        }}
      >
        <div className="flex justify-between gap-1 text-center">
          <div className="w-[90px] bg-gradient-to-b from-orange-600 to-yellow-500 rounded-lg px-2 py-1 font-semibold text-white">
            <h1>$0.00</h1>
            <h1>Total</h1>
          </div>
          <div className="w-[90px] bg-gradient-to-b from-orange-600 to-yellow-500 rounded-lg px-2 py-1 font-semibold text-white">
            <h1>$0.00</h1>
            <h1>Withdraw</h1>
          </div>
          <div className="w-[90px] bg-gradient-to-b from-orange-600 to-yellow-500 rounded-lg px-2 py-1 font-semibold text-white">
            <h1>$0.00</h1>
            <h1>Balance</h1>
          </div>
        </div>
        <div className="mt-2">
          <input
            className="w-[100%] border-2 rounded-md border-gray-200 p-1"
            type="number"
            placeholder="Enter Amount"
          />
          <button className="bg-gradient-to-r from-red-400 to-red-600 mt-2 p-1 px-2 rounded-md text-sm text-white">
            Claim Withdrawal ↗
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-between px-1 py-2 border-2 border-gray-200 shadow-md shadow-gray-200 rounded-lg gap-2 font-semibold mt-8">
        <button className="w-[140px] py-2 rounded-md px-2 bg-gradient-to-r from-red-400 to-red-600 text-sm text-white">
          Claim Rank Reward
        </button>
        <button className="w-[140px] py-2 rounded-md px-2 bg-gradient-to-r from-red-400 to-red-600 text-sm text-white">
          Claim Royality
        </button>
        <button className="w-[140px] py-2 rounded-md px-2 bg-gradient-to-r from-red-400 to-red-600 text-sm text-white">
          Claim Self
        </button>
      </div>
      {/* <AnimatedBorderBox>
        <h1 className="font-bold text-lg text-center text-gray-500">
          Currrent Package Capping Bar
        </h1>
        <div className="flex text-[11px] justify-between font-semibold text-gray-500">
          <h1>Total : $110.00</h1> 
          <span>|</span>
          <h1>Used : $100.00</h1> 
          <span>|</span>
          <h1>Balance : $110.00</h1> 
        </div>
        <div>

        </div>
        
      </AnimatedBorderBox> */}
      <AnimatedBorderBox>
        <h1 className="font-bold text-xl text-center text-gray-500">
          Affiliate Summary
        </h1>
        <div className="grid grid-cols-1 w-full gap-4 mt-4">
          <div className="bg-gradient-to-b h-16 w-full px-10 from-yellow-600 to-yellow-800 rounded-md py-1 text-white flex items-center gap-4">
            <div className="text-3xl flex items-center justify-center">👑</div>
            <div>
              <h1 className="text-lg font-semibold">Sponsor</h1>
              <h2 className="text-gray-300 text-sm font-semibold">
                0xcd****26D4
              </h2>
            </div>
          </div>

          <div className="bg-gradient-to-b h-16 w-full px-10 from-yellow-600 to-yellow-800 rounded-md py-1 text-white flex items-center gap-4">
            <div className="text-3xl flex items-center justify-center">👥</div>
            <div>
              <h1 className="text-lg font-semibold">Direct Team</h1>
              <h2 className="text-gray-300 text-sm font-semibold">0</h2>
            </div>
          </div>

          <div className="bg-gradient-to-b h-16 w-full px-10 from-yellow-600 to-yellow-800 rounded-md py-1 text-white flex items-center gap-4">
            <div className="text-3xl flex items-center justify-center">👥</div>
            <div>
              <h1 className="text-lg font-semibold">Downline Team</h1>
              <h2 className="text-gray-300 text-sm font-semibold">0</h2>
            </div>
          </div>

          <div className="bg-gradient-to-b h-16 w-full px-10 from-yellow-600 to-yellow-800 rounded-md py-1 text-white flex items-center gap-4">
            <div className="text-3xl flex items-center justify-center">💼</div>
            <div>
              <h1 className="text-lg font-semibold">Direct Business</h1>
              <h2 className="text-gray-300 text-sm font-semibold">$0.00</h2>
            </div>
          </div>

          <div className="bg-gradient-to-b h-16 w-full px-8 from-yellow-600 to-yellow-800 rounded-md py-1 text-white flex items-center gap-4">
            <div className="text-3xl flex items-center justify-center">💼</div>
            <div>
              <h1 className="text-lg font-semibold">Downline Business</h1>
              <h2 className="text-gray-300 text-sm font-semibold">$0.00</h2>
            </div>
          </div>

          <div className="bg-gradient-to-b h-16 w-full px-10 from-yellow-600 to-yellow-800 rounded-md py-1 text-white flex items-center gap-4">
            <div className="text-3xl flex items-center justify-center">🎓</div>
            <div>
              <h1 className="text-lg font-semibold">My Investment</h1>
              <h2 className="text-gray-300 text-sm font-semibold">$60.00</h2>
            </div>
          </div>
        </div>
      </AnimatedBorderBox>
    </div>
  );
};

export default MlmDetails;
