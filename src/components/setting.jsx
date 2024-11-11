import React from "react";
import meta from "./images/meta.png";
import avatar from "./images/avatar.png";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronDown,
  faPaperPlane,
  faEye,
  faInfoCircle,
  faUsers,
  faMoneyBillTransfer,
  faHistory,
  faBell,
  faClock,
  faChartLine,
  faMoneyBillWave,
  faHandHoldingUsd, 
  faTachometerAlt ,
  faSignOutAlt,
  faQuestionCircle,
  faChalkboardTeacher,
  faUserFriends,
  faNetworkWired,
  faCheckCircle ,
  faDollarSign,
  faTrophy,
  faHeart,
  faComment,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setAuthUser } from "@/redux/authSlice";
import { setPosts, setSelectedPost } from "@/redux/postSlice";

const Setting = () => {
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [isInvestOpen, setIsInvestOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isAllIncomesOpen, setIsAllIncomesOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const logoutHandler = async () => {

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/logout`,
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response);
    }
  };

  return (
    <div className="pt-20 pb-20">
      <h1 className="text-center font-serif text-2xl">Main Menu</h1>
      <div className="flex justify-between px-6 mt-4 items-center">
        <h1 className="text-gray-500 font-bold">Your Account</h1>
        <img src={meta} className="w-14 h-5" />
      </div>
      <div className="flex items-center justify-between mt-4 p-4 bg-white hover:bg-gray-100 cursor-pointer border-b">
        <div className="flex items-center">
          {/* Profile Icon */}
          <img src={avatar} className="w-10 rounded-full" />
          <div className="ml-4 text-left">
            <p className="font-semibold text-black text-left">
              Accounts Centre
            </p>
            <p className="text-sm text-gray-500 text-left">
              Details, referral, personal details, ad preferences
            </p>
          </div>
        </div>
        {/* Arrow Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
      <div className="bg-white p-3">
        <p className="text-gray-500 font-medium mb-4 text-left">
          How you use DazzleDen
        </p>

        {/* Dashboard */}
        <div className="flex justify-between items-center py-4  cursor-pointer"  onClick={() => {navigate("/")}}>
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faTachometerAlt } className="text-black w-6 h-6" />
            <p className="text-black font-semibold">Dashboard</p>
          </div>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-gray-500 w-4 h-3"
          />
        </div>

        {/* Invest */}
        <div
          className="flex justify-between items-center py-4  cursor-pointer"
          onClick={() => navigate('/invester-recharge')}
        >
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faChartLine} className="text-black w-6 h-6" />
            <p className="text-black font-semibold">Invest</p>
          </div>
          <FontAwesomeIcon
            icon={isInvestOpen ? faChevronDown : faChevronRight}
            className="text-gray-500 w-4 h-3"
          />
        </div>
        {/* {isInvestOpen && (
          <div>
          <div className="flex justify-between items-center py-4  pl-20 pr-2 bg-gray-300 cursor-pointer">
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faChartLine} className="text-black w-4 h-6" />
            <p className="text-black font-semibold">Invest</p>
          </div>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-gray-500  w-4 h-3"
          />
        </div>
         <div className="flex justify-between items-center py-4  pl-20 pr-2  cursor-pointer">
         <div className="flex items-center gap-4">
           <FontAwesomeIcon icon={faHistory} className="text-black w-4 h-6" />
           <p className="text-black font-semibold">History</p>
         </div>
         <FontAwesomeIcon
           icon={faChevronRight}
           className="text-gray-500  w-4 h-3"
         />
       </div>
       </div>
        )} */}

        {/* Team */}
        <div
          className="flex justify-between items-center py-4  cursor-pointer"
          
          onClick={() => {user?.userType === "Invester" ? setIsTeamOpen(!isTeamOpen) : navigate("/influencer-packages")}}
        >
          <div className="flex items-center gap-4">
            {
              user?.userType === "Invester" ? (<FontAwesomeIcon icon={faUsers} className="text-black w-6 h-6" />) : (<FontAwesomeIcon icon={faCheckCircle } className="text-black w-6 h-6" />)
            }
            
            <p className="text-black font-semibold">{user?.userType === "Invester" ? "Team" : "Meta Verified"}</p>
          </div>
          <FontAwesomeIcon
            icon={isTeamOpen ? faChevronDown : faChevronRight}
            className="text-gray-500 w-4 h-3"
          />
        </div>
        {isTeamOpen && (
          <div className="">
            {/* <div className="flex justify-between items-center py-4 pl-20 pr-2 bg-gray-300 cursor-pointer">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faPaperPlane} className="text-black w-4 h-4" />
                <p className="text-black font-semibold">My Direct</p>
              </div>
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-gray-500  w-4 h-3"
              />
            </div> */}
            <div className="flex justify-between items-center py-4 pl-20 pr-2  cursor-pointer" onClick={() => {navigate("/my-team")}}>
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faUsers} className="text-black w-5 h-6" />
                <p className="text-black font-semibold">My All Team</p>
              </div>
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-gray-500  w-4 h-3"
              />
            </div>
            <div className="flex justify-between items-center py-4  pl-20 pr-2 bg-gray-300 cursor-pointer">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faInfoCircle} className="text-black w-4 h-6" />
                <p className="text-black font-semibold">Team Details</p>
              </div>
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-gray-500  w-4 h-3"
              />
            </div>
            <div className="flex justify-between items-center py-4  pl-20 pr-2 cursor-pointer">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faEye} className="text-black w-4 h-6" />
                <p className="text-black font-semibold">Tree View</p>
              </div>
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-gray-500  w-4 h-3"
              />
            </div>
          </div>
        )}

        {/* All Incomes */}
        <div
          className="flex justify-between items-center py-4  cursor-pointer"
          onClick={() => setIsAllIncomesOpen(!isAllIncomesOpen)}
        >
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faMoneyBillWave } className="text-black w-6 h-6" />
            <p className="text-black font-semibold">All Incomes</p>
          </div>
          <FontAwesomeIcon
            icon={isAllIncomesOpen ? faChevronDown : faChevronRight}
            className="text-gray-500  w-4 h-3"
          />
        </div>
        {isAllIncomesOpen && (
          <div>
           <div className="flex justify-between items-center py-4  pl-20 pr-2 bg-gray-300 cursor-pointer" onClick={() => {navigate("/generation-income")}}>
           <div className="flex items-center gap-4">
            {
              user?.userType === "Invester" ? (<FontAwesomeIcon icon={faNetworkWired} className="text-black w-4 h-6" />) : (<FontAwesomeIcon icon={faHeart} className="text-black w-4 h-6" />)
            }
             
             <p className="text-black font-semibold">{user?.userType === "Invester" ? "Generation Income" : "Like Income"}</p>
           </div>
           <FontAwesomeIcon
             icon={faChevronRight}
             className="text-gray-500  w-4 h-3"
           />
         </div>
          <div className="flex justify-between items-center py-4  pl-20 pr-2  cursor-pointer" onClick={() => {navigate("/referral-income")}}>
          <div className="flex items-center gap-4">
          {
              user?.userType === "Invester" ? (<FontAwesomeIcon icon={faUserFriends} className="text-black w-4 h-6" />) : (<FontAwesomeIcon icon={faComment} className="text-black w-4 h-6" />)
            }
            <p className="text-black font-semibold">{user?.userType === "Invester" ? "Referral Income" : "Comment Income"}</p>
          </div>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-gray-500  w-4 h-3"
          />
        </div>
        <div className="flex justify-between items-center py-4  pl-20 pr-2 bg-gray-300  cursor-pointer" onClick={() => {navigate("/revenue-income")}}>
          <div className="flex items-center gap-4">
          {
              user?.userType === "Invester" ? (<FontAwesomeIcon icon={faDollarSign} className="text-black w-4 h-6" />) : (<FontAwesomeIcon icon={faShare} className="text-black w-4 h-6" />)
            }
            <p className="text-black font-semibold">{user?.userType === "Invester" ? "Revenue Income" : "Share Income"}</p>
          </div>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-gray-500  w-4 h-3"
          />
        </div>
        <div className="flex justify-between items-center py-4  pl-20 pr-2  cursor-pointer" onClick={() => {navigate("/rewards-income")}}>
          <div className="flex items-center gap-4">
          {
              user?.userType === "Invester" ? (<FontAwesomeIcon icon={faTrophy} className="text-black w-4 h-6" />) : (<FontAwesomeIcon icon={faMoneyBillTransfer} className="text-black w-4 h-6" />)
            }
            <p className="text-black font-semibold">{user?.userType === "Invester" ? "Rewards" : "Other Incomes"}</p>
          </div>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-gray-500  w-4 h-3"
          />
        </div>
        </div>
        )}

        {/* Withdraw */}
        <div
          className="flex justify-between items-center py-4  cursor-pointer"
          onClick={() => setIsWithdrawOpen(!isWithdrawOpen)}
        >
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faHandHoldingUsd} className="text-black w-6 h-6" />
            <p className="text-black font-semibold">Withdraw</p>
          </div>
          <FontAwesomeIcon
            icon={isWithdrawOpen ? faChevronDown : faChevronRight}
            className="text-gray-500  w-4 h-3"
          />
        </div>
        {isWithdrawOpen && (
          <div>
           <div className="flex justify-between items-center py-4  pl-20 pr-2 bg-gray-300 cursor-pointer">
           <div className="flex items-center gap-4">
             <FontAwesomeIcon icon={faMoneyBillTransfer} className="text-black w-4 h-6" />
             <p className="text-black font-semibold">Withdraw</p>
           </div>
           <FontAwesomeIcon
             icon={faChevronRight}
             className="text-gray-500  w-4 h-3"
           />
         </div>
          <div className="flex justify-between items-center py-4  pl-20 pr-2  cursor-pointer">
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faHistory} className="text-black w-4 h-6" />
            <p className="text-black font-semibold">History</p>
          </div>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-gray-500  w-4 h-3"
          />
        </div>
        </div>
        )}

        {/* Help Desk (No submenu) */}
        <div className="flex justify-between items-center py-4  cursor-pointer">
          <div className="flex items-center gap-4">
            <FontAwesomeIcon
              icon={faQuestionCircle}
              className="text-black w-6 h-6"
            />
            <p className="text-black font-semibold">Help Desk</p>
          </div>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-gray-500 w-4 h-3"
          />
        </div>

        {/* Presentation (No submenu) */}
        <div className="flex justify-between items-center py-4  cursor-pointer">
          <div className="flex items-center gap-4">
            <FontAwesomeIcon
              icon={faChalkboardTeacher}
              className="text-black w-6 h-6"
            />
            <p className="text-black font-semibold">Presentation</p>
          </div>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-gray-500  w-4 h-3"
          />
        </div>

        {/* Logout (No submenu) */}
        <div className="flex justify-between items-center py-4  cursor-pointer" onClick={logoutHandler}>
          <div className="flex items-center gap-4">
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="text-black w-6 h-6"
            />
            <p className="text-black font-semibold">Logout</p>
          </div>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-gray-500 w-4 h-3"
          />
        </div>
      </div>
    </div>
  );
};

export default Setting;
