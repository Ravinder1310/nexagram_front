import React, { useState } from 'react'
import { Heart, Wallet , Home, LogOut,  BarChart2, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom';
import CreatePost from './CreatePost';

const BottomNav = () => {

    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const { likeNotification } = useSelector(store => store.realTimeNotification);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);

  return (
    <div className={`fixed sm:hidden bottom-0 py-1 border-4 border-gray-100 bg-white shadow-xl shadow-gray-300 w-full z-20`}>
      <div className="flex justify-around items-center py-2">

        {/* Home Section */}
        <div className="flex flex-col items-cente hover:bg-pink-600 hover:text-white hover:cursor-pointer p-2 rounded-md" onClick={() => { navigate(`/`) }}>
          <div className=" text-md text-center">
            <Home className="m-auto"/>
          </div>
        </div>

        {/* Packages Section */}
        <div className="flex flex-col items-center hover:bg-pink-600 hover:text-white hover:cursor-pointer p-2 rounded-md" onClick={() => { navigate(`/plans`) }}>
           <div className="text-md text-center">
            <Wallet className="m-auto"/>
          </div>
        </div>

        <div onClick={() => {setOpen(true)}} className="flex flex-col items-center hover:bg-pink-600 hover:text-white hover:cursor-pointer p-2 rounded-md">
           <div className="text-md text-center">
            <PlusSquare className="m-auto"/>
            
          </div>
        </div>

        {/* Recharge Section */}
        <div className="flex flex-col items-center hover:bg-pink-600 hover:text-white hover:cursor-pointer p-2 rounded-md" onClick={() => { navigate("/incomes") }}>
        <div className="text-md text-center">
            <TrendingUp className="m-auto"/>
        </div>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center hover:bg-pink-600 hover:text-white hover:cursor-pointer p-2 rounded-md" onClick={() => { navigate(`/profile/${user?._id}`); }}>
        <div className="text-md text-center">
        <Avatar className='w-6 h-6'>
                    <AvatarImage src={user?.profilePicture} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
          </div>
        </div>
        <CreatePost open={open} setOpen={setOpen} />
      </div>
    </div>
  )
}

export default BottomNav