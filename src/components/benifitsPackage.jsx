import React from "react";
import { useNavigate } from "react-router-dom";
import avatar from "./images/avatar.png";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import {
  AiOutlineHeart,
  AiOutlineDollarCircle,
  AiOutlineBarChart,
  AiOutlineCustomerService,
} from "react-icons/ai";
import { BsShieldFillCheck } from "react-icons/bs"; // Shield icon
import { FaHeadset } from "react-icons/fa"; // Headset icon for support
import { FaSmile } from "react-icons/fa"; // Smile icon for stickers

function BenefitsPackage() {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const handleRedirect = () => {
    navigate("/influencer-packages");
  };

  return (
    <div className="bg-gray-100 py-20 ">
      <div className="max-w-4xl mx-auto text-center bg-white shadow-md rounded-lg py-10 px-6">
        <h1 className="text-xl font-bold text-gray-800 mb-6">
          Verify your account by purchasing the package.
        </h1>
        <Avatar className="w-[100px] h-[100px] m-auto">
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback src={avatar} />
        </Avatar>
        <div className="flex justify-center gap-2 items-center mt-3">
          <h1 className=" font-mono text-xl ml-6">{user?.username}</h1>
          <BsShieldFillCheck className="text-blue-600 text-md mr-4" />
        </div>
        <p className="text-lg text-gray-600 mb-12 mt-4">
          Our packages are designed to help you grow your influence, increase
          engagement, and get rewarded for your social media activity.
        </p>
        <div className="text-left space-y-6">
          {/* Benefit 1: Verified Badge */}
          <div className="flex">
            <BsShieldFillCheck className="text-blue-600 h-[40px] text-[100px] mr-4" />
            <div className="">
              <h2 className="text-lg text-left font-bold text-gray-900">
                Maximize Your Engagement
              </h2>
              <p className="text-gray-600 text-left text-sm">
                Upload your reels and content to reach a wider audience. Our
                packages ensure that your content gets the exposure it deserves,
                increasing likes, shares, and comments.
              </p>
            </div>
          </div>

          {/* Benefit 2: Increased Account Protection */}
          <div className="flex">
            <AiOutlineHeart className="text-blue-600 h-[40px] text-[100px] mr-4" />
            <div>
              <h2 className="text-lg text-left font-bold text-gray-900">
                Earn More from Your Content
              </h2>
              <p className="text-gray-600 text-left text-sm">
                For every like, share, and comment your posts receive, you'll
                earn rewards. Turn your social media activity into a steady
                stream of passive income.
              </p>
            </div>
          </div>

          {/* Benefit 3: Enhanced Support */}
          <div className="flex">
            <FaHeadset className="text-blue-600 h-[40px] text-[100px] mr-4" />
            <div>
              <h2 className="text-lg text-left font-bold text-gray-900">
                Monthly Analytics and Insights
              </h2>
              <p className="text-gray-600 text-left text-sm">
                Gain access to detailed analytics that help you understand your
                audience better, allowing you to fine-tune your strategy for
                maximum impact.
              </p>
            </div>
          </div>

          {/* Benefit 4: Unique Stickers */}
          <div className="flex">
            <FaSmile className="text-blue-600 h-[40px] text-[100px] mr-4" />
            <div>
              <h2 className="text-lg font-bold text-left text-gray-900">
                Priority Support and Assistance
              </h2>
              <p className="text-gray-600 text-left text-sm">
                Get priority access to our dedicated support team, who will
                assist you in optimizing your content strategy and maximizing
                your earnings.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <button
            onClick={handleRedirect}
            className="bg-blue-600 text-white py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300"
          >
            See Our Packages
          </button>
        </div>
      </div>
    </div>
  );
}

export default BenefitsPackage;
