import React, { useEffect, useState } from 'react'
import { Heart, Wallet, Search  , Home, LogOut,  BarChart2,BatteryCharging,RefreshCw, MessageCircle, PlusSquare,Phone, Smartphone, TrendingUp } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom';
import CreatePost from './CreatePost';
import avatar from "./images/avatar.png"

const BottomNav = () => {

    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const { likeNotification } = useSelector(store => store.realTimeNotification);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    useEffect(()=>{
      // console.log("user=>",user)
    })

  return (
    <div className={`fixed sm:hidden bottom-0  border-gray-100 text-white bg-blue-400 shadow-xl shadow-gray-300 w-full z-20`}>
      <div className="flex justify-around items-center py-2">

        {/* Home Section */}
        <div className="flex flex-col items-cente hover:cursor-pointer p-2 rounded-md" onClick={() => { navigate(`/`) }}>
          <div className=" text-md text-center">
            <Home className="m-auto"/>
          </div>
        </div>

        {/* Packages Section */}
        <div className="flex flex-col items-center hover:cursor-pointer p-2 rounded-md" onClick={() => { user.userType ==='Invester' ? navigate(`/plans`) : navigate(`/`)  }}>
           <div className="text-md text-center">
            {
              user?.userType === "Invester" ? (<Wallet className="m-auto"/>) : (<Search className="m-auto"/>)
            }
            
          </div>
        </div>

        <div onClick={() => {setOpen(true)}} className="flex flex-col items-center hover:cursor-pointer p-2 rounded-md">
           <div className="text-md text-center">
            <PlusSquare className="m-auto"/>
            
          </div>
        </div>

        {/* Recharge Section */}
        <div className="flex flex-col items-center hover:cursor-pointer p-2 rounded-md" onClick={() => { navigate("/all-recharge") }}>
        <div className="text-md text-center">
        <RefreshCw className="m-auto"/>

            {/* <img src={utility} alt='error' className="m-auto w-10"/> */}
        </div>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center hover:cursor-pointer p-2 rounded-md" onClick={() => { navigate(`/profile/${user?._id}`); }}>
        <div className="text-md text-center">
        <Avatar className='w-8 h-8'>
                    <AvatarImage src={user?.profilePicture} alt="@shadcn" />
                    <AvatarFallback src={avatar} />
                </Avatar>
          </div>
        </div>
        <CreatePost open={open} setOpen={setOpen} />
      </div>
    </div>
  )
}

export default BottomNav