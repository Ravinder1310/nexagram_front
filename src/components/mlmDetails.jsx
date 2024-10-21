import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import investLogo from "./images/invest.png"

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
    <div className="pt-20 pb-20">
      <Toaster />
      <h1 className="text-center mb-6 font-serif text-2xl">Funds & Links</h1>
      <div className="flex justify-center gap-3 px-4">
        <div className="shadow-lg shadow-gray-300 bg-gradient-to-t from-blue-500 to-blue-200 rounded-md w-1/2  text-center p-2">
          <h1 className="font-bold">Rs. 2400</h1>
          <h2 className="font-semibold">Total Earning</h2>
        </div>
        <div className="shadow-lg shadow-gray-300 bg-gradient-to-t from-blue-500 to-blue-200 rounded-md w-1/2 text-center p-2">
          <h1 className="font-bold">Rs. 2400</h1>
          <h2 className="font-semibold">Total Withdrawl</h2>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 px-4 mt-10">
        <button className="w-full h-10 bg-gradient-to-b from-violet-500 to-violet-200 font-bold text-white text-sm rounded-md px-2">
          Add Fund
        </button>
        <button className="w-full h-10  bg-gradient-to-b from-violet-500 to-violet-200 font-bold text-white text-sm rounded-md px-2">
          Join
        </button>
        <button className="w-full h-10  bg-gradient-to-b from-violet-500 to-violet-200 font-bold text-white text-sm rounded-md">
          Zoom
        </button>
        <button className="w-full h-10  bg-gradient-to-b from-violet-500 to-violet-200 font-bold text-white text-sm rounded-md">
          Activation
        </button>
        <button className="w-full h-10  bg-gradient-to-b from-violet-500 to-violet-200 font-bold text-white text-sm rounded-md">
          Withdrawl
        </button>
        <button className="w-full h-10  bg-gradient-to-b from-violet-500 to-violet-200 font-bold text-white text-sm rounded-md">
          Rewards
        </button>
      </div>
      <div className="mt-8 px-4 text-center">
        <h1 className="font-bold text-xl">Your Invitation Link</h1>
        <div className="flex flex-col justify-center items-center mt-2">
          <div className="w-full border p-2 py-4 rounded-lg border-gray-300 shadow-lg  flex justify-between items-center">
            <span>{invitationLink}</span>
            <button
              className={`ml-1 rounded-full bg-gradient-to-r from-red-400 to-red-600 text-white px-3 py-1 ${
                isLinkCopied ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={copyToClipboard}
              disabled={isLinkCopied}
            >
              {isLinkCopied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-[80%] m-auto justify-center gap-4 mt-5">
        <div className="text-md text-center text-white bg-blue-500 rounded-[6px] p-1">
          <Facebook className="m-auto" />
        </div>
        <div className="text-md text-center text-white bg-blue-400 rounded-[6px] p-1">
          <Twitter className="m-auto" />
        </div>
        <div className="text-md text-center text-white bg-red-500 rounded-md p-1">
          <Instagram className="m-auto" />
        </div>
        <div className="text-md text-center text-white bg-blue-600 rounded-[6px] p-1">
          <Linkedin className="m-auto" />
        </div>
        <div className="text-md text-center bg-green-400 rounded-[6px] p-1">
          <FaWhatsapp className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className=" shadow-lg w-[90%] m-auto mt-6 p-4">
          <div className="flex">
            <img src={investLogo} className="w-[30%]" alt="error"/>
            <div className="text-center w-[70%]">
              <h1 className="text-lg font-serif">My Total Investment</h1>
              <p className="font-bold">Rs. 200</p>
              <button className=" text-white bg-blue-600 font-bold rounded-[6px] p-1 px-2 mt-2">Plan Details</button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default MlmDetails;
