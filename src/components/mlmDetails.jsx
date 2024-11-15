import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { FaWhatsapp, FaTrophy, FaAward } from "react-icons/fa";
import investLogo from "./images/invest.png";
import { motion } from "framer-motion";
import sapphire from "./images/ranks/1.png";
import ruby from "./images/ranks/2.png";
import topaz from "./images/ranks/3.png";
import emerald from "./images/ranks/4.png";
import platinum from "./images/ranks/5.png";
import diamond from "./images/ranks/6.png";
import greenDiamond from "./images/ranks/7.png";
import blueDiamond from "./images/ranks/8.png";
import blackDiamond from "./images/ranks/9.png";
import goldDiamond from "./images/ranks/10.png";
import congrats from "./images/congrats.gif";
import axios from "axios";
import RewardIncomes from "./investerIncome/rewardsIncome";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { setAuthUser } from "@/redux/authSlice";

// import { BadgeCheckIcon } from '@heroicons/react/solid';

const AnimatedBorderBox = ({ children }) => (
  <div className="relative p-[2px] rounded-lg overflow-hidden mt-10 mb-10">
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
    <div className="relative p-3 bg-white text-black rounded-lg z-10">
      {children}

      {/* Corner Borders */}
      <span className="absolute top-0 left-0 w-[8px] h-[8px] bg-gradient-to-r from-[#0d355b] to-[#0d355b]"></span>
      <span className="absolute top-0 right-0 w-[8px] h-[8px] bg-gradient-to-r from-[#0d355b] to-[#0d355b]"></span>
      <span className="absolute bottom-0 left-0 w-[8px] h-[8px] bg-gradient-to-r from-[#0d355b] to-[#0d355b]"></span>
      <span className="absolute bottom-0 right-0 w-[8px] h-[8px] bg-gradient-to-r from-[#0d355b] to-[#0d355b]"></span>
    </div>
  </div>
);

const MlmDetails = () => {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [invitationLink, setInvitationLink] = useState("");
  const [selectedRank, setSelectedRank] = useState(0);
  const { user } = useSelector((store) => store.auth);
  const [referralIncome, setReferralIncome] = useState(0);
  const [dailyIncome, setDailyIncome] = useState(0);
  const [royalityIncome, setRoyalityIncome] = useState(0);
  const [generationIncome, setGenerationIncome] = useState(0);
  const [directTeam, setDirectTeam] = useState(0);
  const [withdrawlAmount, setWithdrawlAmount] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [withdrawlLoading, setWithdrawlLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenWithdrawl, setIsOpenWithdrawl] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const openModalWithdrawl = () => setIsOpenWithdrawl(true);
  const closeModalWithdrawl = () => setIsOpenWithdrawl(false);
  const [levelIncomeTotal, setLevelIncomeTotal] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const rankRequirements = [
    {
      rank: "SAPPHIRE",
      logo: sapphire,
      self: 250,
      directTeam: 5,
      directBusiness: 1000,
      totalTeamSize: 20,
      teamBusiness: 10000,
      reward: 250,
    },
    {
      rank: "RUBY",
      logo: ruby,
      self: 500,
      directTeam: 7,
      directBusiness: 1500,
      totalTeamSize: 50,
      teamBusiness: 30000,
      reward: 750,
    },
    {
      rank: "TOPAZ",
      logo: topaz,
      self: 1000,
      directTeam: 9,
      directBusiness: 2000,
      totalTeamSize: "2 Ruby",
      teamBusiness: "Any",
      reward: 3000,
    },
    {
      rank: "EMERALD",
      logo: emerald,
      self: 1500,
      directTeam: 11,
      directBusiness: 3000,
      totalTeamSize: "2 Topaz",
      teamBusiness: "Any",
      reward: 10000,
    },
    {
      rank: "PLATINUM",
      logo: platinum,
      self: 2000,
      directTeam: 15,
      directBusiness: 3500,
      totalTeamSize: "2 Emerald",
      teamBusiness: "Any",
      reward: 25000,
    },
    {
      rank: "DIAMOND",
      logo: diamond,
      self: 2500,
      directTeam: 17,
      directBusiness: 4000,
      totalTeamSize: "2 Platinum",
      teamBusiness: "Any",
      reward: 7500,
    },
    {
      rank: "GREEN_DIAMOND",
      logo: greenDiamond,
      self: 3000,
      directTeam: 15,
      directBusiness: 4500,
      totalTeamSize: "2 Diamonds",
      teamBusiness: "Any",
      reward: 225000,
    },
    {
      rank: "BLUE_DIAMOND",
      logo: blueDiamond,
      self: 3500,
      directTeam: 21,
      directBusiness: 5000,
      totalTeamSize: "2 Green Diamond",
      teamBusiness: "Any",
      reward: 700000,
    },
    {
      rank: "BLACK_DIAMOND",
      logo: blackDiamond,
      self: 4000,
      directTeam: 23,
      directBusiness: 5500,
      totalTeamSize: "3 Blue Diamond",
      teamBusiness: "Any",
      reward: 900000,
    },
    {
      rank: "CROWN_DIAMOND",
      logo: goldDiamond,
      self: 5000,
      directTeam: 25,
      directBusiness: 10000,
      totalTeamSize: "3 Black Diamond",
      teamBusiness: "Any",
      reward: 1100000,
    },
  ];

  const handleRank = (rank) => {
    console.log(rank);
    setSelectedRank(rank);
    setIsOpen(true);
  };

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

  const getDirectReerralIncomeHistory = async () => {
    try {
      let res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/invester/direct-referral-income-history/${user?._id}`
      );
      let totalDaily = 0;
      for (let i = 0; i < res.data.data.length; i++) {
        totalDaily += res.data.data[i].amount;
      }
      setReferralIncome(totalDaily);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getRankIncomeHistory = async () => {
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/invester/rank-income-history/${
          user?._id
        }`
      );
      // console.log(res.data.data);
      // setRankIncomeHistory(res.data.data);
      let totalDaily = 0;
      for (let i = 0; i < res.data.data.length; i++) {
        totalDaily += res.data.data[i].amount;
      }
      setRoyalityIncome(totalDaily);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDailyIncomeHistory = async () => {
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/invester/daily-history/${
          user?._id
        }`
      );
      let totalDaily = 0;
      for (let i = 0; i < res.data.data.length; i++) {
        totalDaily += res.data.data[i].amount;
      }
      setDailyIncome(totalDaily);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getRewardIncomeHistory = async () => {
    try {
      let res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/invester/reward-income-history/${user?._id}`
      );
      // console.log(res.data.data);
      // setRewardIncomeHistory(res.data.data);
      let totalDaily = 0;
      for (let i = 0; i < res.data.data.length; i++) {
        totalDaily += res.data.data[i].amount;
      }
      setRewards(totalDaily);
    } catch (error) {
      console.log(error.message);
    }
  };


  // const getWithdrawlHistory = async () => {
  //   try {
  //     let res = await axios.get(
  //       `${
  //         import.meta.env.VITE_API_URL
  //       }/api/v1/investerer/withdrawl-history/${user?._id}`
  //     );
  //     // console.log(res.data.data);
  //     setRewardIncomeHistory(res.data.data);
  //     let totalDaily = 0;
  //     for (let i = 0; i < res.data.data.length; i++) {
  //       totalDaily += res.data.data[i].amount;
  //     }
  //     setRewards(totalDaily);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };


  const getGenerationIncomeHistory = async () => {
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/invester/generation-income-history/${user?._id}`
      );
      // console.log(res.data.data);
      let totalLevel = 0;
      for (let i = 0; i < res.data.data.length; i++) {
        totalLevel += res.data.data[i].amount;
      }
      setLevelIncomeTotal(totalLevel);
      // setGenerationIncomeHistory(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };


  const incomeWithdrawl = async () => {
    try {
      setWithdrawlLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/invester/withdrawl/${
          user?._id
        }/${withdrawlAmount}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        // toast.success(res.data.message);
        // console.log(res.data.data);
        
        setWithdrawlLoading(false);
        setWithdrawlAmount(0);
        setIsOpenWithdrawl(true)
        dispatch(setAuthUser(res.data.data));
      }
    } catch (error) {
      console.log(error);
      setWithdrawlLoading(false)
        toast.error(error.message);
    }
  };

  useEffect(() => {
    generateInvitationLink();
    getDirectReerralIncomeHistory();
    getRankIncomeHistory();
    getDailyIncomeHistory();
    getRewardIncomeHistory();
    getGenerationIncomeHistory();
    console.log(".............", user);

    // getDirectTeam();
    // console.log("-------------------",user?.ranksAchieved.TOPAZ);
  }, []);

  return (
    <div className="pt-20 pb-20 px-3">
      <Toaster />
      <div className="flex flex-wrap gap-y-3 justify-between">
      <div className="w-[49%] h-[70px] text-center bg-gradient-to-r from-[#0d355b] to-[#0d355b] rounded-lg px-4 py-3 text-white">
            {/* <div className="text-3xl flex items-center justify-center">🎓</div> */}
            <div>
            <h2 className=" text-sm font-bold">
                $ {parseFloat(user?.totalInvestment).toFixed(2) || 0.00 }
              </h2>
              <h1 className="text-md font-semibold">My Investment</h1>
              
            </div>
          </div>
        {/* //#0d355b */}
        <div
          className="w-[49%] h-[70px] text-center bg-gradient-to-r from-[#0d355b] to-[#0d355b] rounded-lg px-4 py-3 text-white"
          onClick={() => {
            navigate("/revenue-income");
          }}
        >
          <p className="font-semibold text-white">
            $ {parseFloat(dailyIncome).toFixed(2) || 0.00}
          </p>
          <h1 className="font-semibold text-sm">Daily Revenue</h1>
        </div>
        <div
          className="w-[49%] h-[70px] text-center bg-gradient-to-r from-[#0d355b] to-[#0d355b] rounded-lg px-4 py-3 text-white"
          onClick={() => {
            navigate("/referral-income");
          }}
        >
          <p className="font-semibold text-white">
            $ {parseFloat(referralIncome).toFixed(2) || 0.00}
          </p>
          <h1 className="font-semibold text-sm">Direct Income</h1>
        </div>
        <div
          className="w-[49%] h-[70px] text-center bg-gradient-to-r from-[#0d355b] to-[#0d355b] rounded-lg px-4 py-3 text-white"
          onClick={() => {
            navigate("/royality-income");
          }}
        >
          <p className="font-semibold text-white">
            $ {parseFloat(user?.royaltyIncome).toFixed(2) || 0.00}
          </p>
          <h1 className="font-semibold text-sm">Royality Income</h1>
        </div>
        <div
          className="w-[49%] h-[70px] text-center bg-gradient-to-r from-[#0d355b] to-[#0d355b] rounded-lg px-4 py-3 text-white"
          onClick={() => {
            navigate("/generation-income");
          }}
        >
          <p className="font-semibold text-white">
            $ {parseFloat(levelIncomeTotal).toFixed(2) || 0.00}
          </p>
          <h1 className="font-semibold text-sm">Generation Income</h1>
        </div>

        
        <div className="w-[49%] h-[70px] text-center bg-gradient-to-r from-[#0d355b] to-[#0d355b] rounded-lg px-4 py-3 text-white">
          <p className="font-semibold text-white">
            $ {parseFloat(referralIncome + dailyIncome + levelIncomeTotal + user?.rankReward).toFixed(2) || 0.00}
          </p>
          <h1 className="font-semibold text-sm">Total Income</h1>
        </div>
      </div>
      <AnimatedBorderBox>
        <h1 className="font-bold text-xl text-center mt-4">
          Your Invitation Link
        </h1>
        <div className="w-[95%] m-auto text-center px-2 py-2">
          <div className="w-[100%] m-auto">
            <span className="font-bold text-sm text-wrap text-gray-500">
              {invitationLink}
            </span>
          </div>
          <button
            className={` w-[80%] font-mono text-xl rounded-full bg-gradient-to-r mt-4 from-blue-400 to-[#0d355b] text-white px-3 py-1 ${
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
          minHeight: "auto", // Set an appropriate height
        }}
      >
        <h1 className="text-center text-2xl font-serif">Invest to Earn</h1>
        <div className=" text-center mt-6">
          <button
            className="bg-gradient-to-r from-blue-400 to-[#0d355b] p-2 px-2 rounded-md text-md text-white"
            onClick={() => {
              navigate("/invester-recharge");
            }}
          >
            Recharge Wallet
          </button>
        </div>
      </div>
      <div
        className="mt-8 shadow-lg shadow-gray-300 p-4 py-6 border-2 rounded-lg border-gray-200"
        style={{
          backgroundImage: "url('/images/social.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "200px", // Set an appropriate height
        }}
      >
        <h1 className="text-center text-2xl font-serif">
          Withdraw Your Income
        </h1>
        <div>
          <h1 className="text-center mt-2 font-semibold">
            Balance Wallet : $ {parseFloat(user?.earningWallet).toFixed(2) || 0}
          </h1>
        </div>
        <div className="mt-6 text-center">
          <input
            className="w-[100%] border-2 rounded-md text-center border-gray-200 p-1"
            type="number"
            value={withdrawlAmount}
            placeholder="Enter Amount"
            onChange={(e) => {setWithdrawlAmount(e.target.value)}}
          />
          <button className="bg-gradient-to-r from-blue-400 to-[#0d355b] mt-6 p-2 px-2 rounded-md text-md text-white" onClick={incomeWithdrawl}>
            {
              withdrawlLoading ? "Processing" : "Claim Withdrawal ↗"
            }
            
          </button>
        </div>
      </div>
      {/* <div className="flex flex-wrap justify-between px-1 py-2 border-2 border-gray-200 shadow-md shadow-gray-200 rounded-lg gap-2 font-semibold mt-8">
        <button className="w-[140px] py-2 rounded-md px-2 bg-gradient-to-r from-blue-400 to-[#0d355b] text-sm text-white">
          Claim Rank Reward
        </button>
        <button className="w-[140px] py-2 rounded-md px-2 bg-gradient-to-r from-blue-400 to-[#0d355b] text-sm text-white">
          Claim Royality
        </button>
        <button className="w-[140px] py-2 rounded-md px-2 bg-gradient-to-r from-blue-400 to-[#0d355b] text-sm text-white">
          Claim Self
        </button>
      </div> */}
      <AnimatedBorderBox>
        <h1 className="font-bold text-xl text-center text-gray-500">
          Affiliate Summary
        </h1>
        <div className="grid grid-cols-2 w-full mt-4 gap-3">
          <div className="bg-gradient-to-b h-16 text-center w-[100%] from-[#0d355b] to-[#0d355b] rounded-md py-1 text-white gap-1">
            {/* <div className="text-2xl flex items-center justify-center">👑</div> */}
            <div>
              <h1 className="text-md font-semibold mt-1">Sponsor</h1>
              <h2 className="text-gray-300 text-sm font-semibold">
                {user?.referredBy}
              </h2>
            </div>
          </div>

          <div className="bg-gradient-to-b h-16 text-center w-[100%] from-[#0d355b] to-[#0d355b] rounded-md py-1 text-white gap-1">
            {/* <div className="text-2xl flex items-center justify-center">👥</div> */}
            <div>
              <h1 className="text-md font-semibold mt-1">Direct Team</h1>
              <h2 className="text-gray-300 text-sm font-semibold">
                {user?.directTeam.length || 0}
              </h2>
            </div>
          </div>

          <div className="bg-gradient-to-b h-16 text-center w-[100%] from-[#0d355b] to-[#0d355b] rounded-md py-1 text-white gap-1">
            {/* <div className="text-2xl flex items-center justify-center">👥</div> */}
            <div>
              <h1 className="text-md font-semibold mt-2">Dazzle Token</h1>
              <h2 className="text-gray-300 text-sm font-semibold">
                {user?.dazzleToken || 0.00}
              </h2>
            </div>
          </div>

          <div className="bg-gradient-to-b h-16 text-center w-[100%] from-[#0d355b] to-[#0d355b] rounded-md py-1 text-white gap-1">
            {/* <div className="text-3xl flex items-center justify-center">💼</div> */}
            <div>
              <h1 className="text-md font-semibold mt-2">Direct Business</h1>
              <h2 className="text-gray-300 text-sm font-semibold">
                $ {parseFloat(user?.directBussiness).toFixed(2) || 0.00}
              </h2>
            </div>
          </div>

          <div className="bg-gradient-to-b h-16 text-center w-[100%] from-[#0d355b] to-[#0d355b] rounded-md py-1 text-white gap-1">
            {/* <div className="text-3xl flex items-center justify-center">💼</div> */}
            <div>
              <h1 className="text-sm font-semibold mt-2">Downline Business</h1>
              <h2 className="text-gray-300 text-sm font-semibold">
                $ {parseFloat(user?.teamBusiness).toFixed(2) || 0.00}
              </h2>
            </div>
          </div>
          <div className="bg-gradient-to-b h-16 text-center w-[100%] from-[#0d355b] to-[#0d355b] rounded-md py-1 text-white gap-1"
          onClick={() => {
            navigate("/rewards-income");
          }}
          >
            {/* <div className="text-3xl flex items-center justify-center">💼</div> */}
            <div>
              <h1 className="text-sm font-semibold mt-2">Reward Income</h1>
              <h2 className="text-gray-300 text-sm font-semibold">
              $ {parseFloat(user?.rankReward).toFixed(2) || 0.00}
              </h2>
            </div>
          </div>
          
        </div>
      </AnimatedBorderBox>
      <AnimatedBorderBox>
        <h1 className="font-bold text-md text-gray-500 mt-3">
          Rank Details (Team Business Rewards)
        </h1>
        <div
          className="flex p-2 gap-2 overflow-x-auto mt-4"
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

          <div className="text-center w-[120px] h-[auto] flex-shrink-0 relative">
            <img
              src={sapphire}
              className={`h-[120px] ${
                user?.ranksAchieved.SAPPHIRE ? "" : "grayscale"
              } `}
              onClick={() => {
                handleRank(0);
              }}
              alt="error"
            />
            <h1 className="font-mono text-lg mt-3 text-gray-500">Sapphire</h1>
          </div>
          <div className="text-center w-[120px] h-[auto] flex-shrink-0 relative">
            <img
              src={ruby}
              className={`h-[120px] ${
                user?.ranksAchieved.RUBY ? "" : "grayscale"
              } `}
              alt="error"
              onClick={() => {
                handleRank(1);
              }}
            />
            <h1 className="font-mono text-lg mt-3 text-gray-500">Ruby</h1>
          </div>
          <div className="text-center w-[120px] h-[auto] flex-shrink-0 relative">
            <img
              src={topaz}
              className={`h-[120px] ${
                user?.ranksAchieved.TOPAZ ? "" : "grayscale"
              } `}
              alt="error"
              onClick={() => {
                handleRank(2);
              }}
            />
            <h1 className="font-mono text-lg mt-3 text-gray-500">Topaz</h1>
          </div>
          <div className="text-center w-[120px] h-[auto] flex-shrink-0 relative">
            <img
              src={emerald}
              className={`h-[120px] ${
                user?.ranksAchieved.EMERALD ? "" : "grayscale"
              } `}
              alt="error"
              onClick={() => {
                handleRank(3);
              }}
            />
            <h1 className="font-mono text-lg mt-3 text-gray-500">Emerald</h1>
          </div>
          <div className="text-center w-[120px] h-[auto] flex-shrink-0 relative">
            <img
              src={platinum}
              className={`h-[120px] ${
                user?.ranksAchieved.PLATINUM ? "" : "grayscale"
              } `}
              alt="error"
              onClick={() => {
                handleRank(4);
              }}
            />
            <h1 className="font-mono text-lg mt-3 text-gray-500">Platinum</h1>
          </div>
          <div className="text-center w-[120px] h-[auto] flex-shrink-0 relative">
            <img
              src={diamond}
              className={`h-[120px] ${
                user?.ranksAchieved.DIAMOND ? "" : "grayscale"
              } `}
              alt="error"
              onClick={() => {
                handleRank(5);
              }}
            />
            <h1 className="font-mono text-lg mt-3 text-gray-500">Diamond</h1>
          </div>
          <div className="text-center w-[120px] h-[auto] flex-shrink-0 relative">
            <img
              src={greenDiamond}
              className={`h-[120px] ${
                user?.ranksAchieved.GREEN_DIAMOND ? "" : "grayscale"
              } `}
              alt="error"
              onClick={() => {
                handleRank(6);
              }}
            />
            <h1 className="font-mono text-lg mt-3 text-gray-500">
              Green Diamond
            </h1>
          </div>
          <div className="text-center w-[120px] h-[auto] flex-shrink-0 relative">
            <img
              src={blueDiamond}
              className={`h-[120px] ${
                user?.ranksAchieved.BLUE_DIAMOND ? "" : "grayscale"
              } `}
              alt="error"
              onClick={() => {
                handleRank(7);
              }}
            />
            <h1 className="font-mono text-lg mt-3 text-gray-500">
              Blue Diamond
            </h1>
          </div>
          <div className="text-center w-[120px] h-[auto] flex-shrink-0 relative">
            <img
              src={blackDiamond}
              className={`h-[120px] ${
                user?.ranksAchieved.BLACK_DIAMOND ? "" : "grayscale"
              } `}
              alt="error"
              onClick={() => {
                handleRank(8);
              }}
            />
            <h1 className="font-mono text-lg mt-3 text-gray-500">
              Black Diamond
            </h1>
          </div>
          <div className="text-center w-[120px] h-[auto] flex-shrink-0 relative">
            <img
              src={goldDiamond}
              className={`h-[120px] ${
                user?.ranksAchieved.CROWN_DIAMOND ? "" : "grayscale"
              } `}
              alt="error"
              onClick={() => {
                handleRank(9);
              }}
            />
            <h1 className="font-mono text-lg mt-3 text-gray-500">
              Crown Diamond
            </h1>
          </div>
        </div>
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            {
              user?.ranksAchieved[rankRequirements[selectedRank].rank] ? (
              <div className="bg-white p-6 rounded-lg w-[94%] text-center">
                <img src={congrats}/>
                <h1>You Achieved the <span className="text-lg font-bold text-[#0d355b]">{rankRequirements[selectedRank].rank}</span> rank!</h1>
                 <button
                  className=" mt-4 bg-[#0d355b] text-white px-4 py-2 rounded"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>

            ) : (
                <div className="bg-white p-6 rounded-lg w-[94%] text-center">
                <h2 className="text-xl font-bold mb-4">Rank Requirements</h2>
                {/* <p className="text-gray-700 mb-4 text-lg font-serif">
                Here are the requirements or conditions to achieve the Sapphire rank:
              </p> */}
                <img
                  src={rankRequirements[selectedRank]?.logo}
                  className="w-[100px] m-auto mb-4"
                  alt="error"
                />
                {/* Add your requirements or conditions here */}
                <ul className="list-disc list-inside text-gray-600 text-left">
                  <li className="font-bold">
                    Self Activation :{" "}
                    <span className="text-blue-500">
                      $ {rankRequirements[selectedRank]?.self}
                    </span>
                  </li>
                  <li className="font-bold">
                    Direct Team :{" "}
                    <span className="text-blue-500">
                      {rankRequirements[selectedRank]?.directTeam}
                    </span>
                  </li>
                  <li className="font-bold">
                    Direct Business :{" "}
                    <span className="text-blue-500">
                      $ {rankRequirements[selectedRank]?.directBusiness}{" "}
                    </span>
                  </li>
                  <li className="font-bold">
                    Team Size :{" "}
                    <span className="text-blue-500">
                      {rankRequirements[selectedRank]?.totalTeamSize}
                    </span>
                  </li>
                  <li className="font-bold">
                    Team Business :{" "}
                    <span className="text-blue-500">
                      $ {rankRequirements[selectedRank]?.teamBusiness}
                    </span>
                  </li>
                </ul>
  
                <h1 className="text-center mt-4 font-bold">
                  Reward you get from this:{" "}
                  <span className="text-blue-500">
                    $ {rankRequirements[selectedRank]?.reward}
                  </span>
                </h1>
  
                <button
                  className=" mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
              )
            }
           
          </div>
        )}
      </AnimatedBorderBox>
      <Dialog open={isOpenWithdrawl} onOpenChange={closeModalWithdrawl}>
          {/* <DialogTrigger>
            <button onClick={onOpen}>Open Dialog</button> 
          </DialogTrigger> */}
          <DialogContent className=" rounded-xl bg-transparent backdrop-blur-2xl text-white w-[90%]">
            <div className="max-w-[100%] rounded-lg shadow-2xl text-white p-6">
              <button
                onClick={closeModalWithdrawl}
                className="absolute top-8 p-2 py-1 right-8 text-lg rounded-lg text-white bg-black font-bold"
              >
                &times; {/* Close button */}
              </button>
              <div className="text-center">
                {/* <img
                  src={comingSoon}
                  alt="Coming Soon"
                  className="w-[100%] mx-auto"
                /> */}
                <h1 className="text-2xl mt-8 font-bold">
                Withdrawl Successful !
                </h1>
                <h1 className="mt-4 text-lg">The withdrawl amount will be transfer within 24 hours in your wallet.</h1>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        {/* Confetti Effect */}
        {/* {showConfetti && (
          <div className="w-[100%]">
            <Confetti
              numberOfPieces={500}
              recycle={false}
              gravity={0.3}
              colors={[
                "#FF0000",
                "#00FF00",
                "#0000FF",
                "#FFFF00",
                "#FF00FF",
                "#00FFFF",
              ]}
            />
          </div>
        )} */}
    </div>
  );
};

export default MlmDetails;
