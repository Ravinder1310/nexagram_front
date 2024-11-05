import React, { useEffect, useState } from 'react'
import { Heart, Wallet , Home, LogOut,  BarChart2, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
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
      console.log("user=>",user)
    })

  return (
    <div className={`fixed sm:hidden bottom-0 py-1 border-4 border-gray-100 bg-white shadow-xl shadow-gray-300 w-full z-20`}>
      <div className="flex justify-around items-center py-2">

        {/* Home Section */}
        <div className="flex flex-col items-cente hover:cursor-pointer p-2 rounded-md" onClick={() => { navigate(`/`) }}>
          <div className=" text-md text-center">
            <Home className="m-auto"/>
          </div>
        </div>

        {/* Packages Section */}
        <div className="flex flex-col items-center hover:cursor-pointer p-2 rounded-md" onClick={() => { user.userType ==='Invester' ? navigate(`/plans`) : navigate(`/influencer-packages`)  }}>
           <div className="text-md text-center">
            <Wallet className="m-auto"/>
          </div>
        </div>

        <div onClick={() => {setOpen(true)}} className="flex flex-col items-center hover:cursor-pointer p-2 rounded-md">
           <div className="text-md text-center">
            <PlusSquare className="m-auto"/>
            
          </div>
        </div>

        {/* Recharge Section */}
        <div className="flex flex-col items-center hover:cursor-pointer p-2 rounded-md" onClick={() => { navigate("/invester-recharge") }}>
        <div className="text-md text-center">
            <TrendingUp className="m-auto"/>
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