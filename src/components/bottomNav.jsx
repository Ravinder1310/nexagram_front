import React, { useEffect, useRef, useState } from 'react';
import { Home, Wallet, Video, PlusSquare, RefreshCw } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useNavigate } from 'react-router-dom';
import CreatePost from './CreatePost';
import avatar from "./images/avatar.png";

const BottomNav = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // Store the selected file
  const fileInputRef = useRef();

  const handleFileSelection = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setOpen(true); // Open the dialog after selecting the file
    }
  };

  return (
    <div className={`fixed sm:hidden bottom-0 border-gray-100 text-white bg-blue-400 shadow-xl shadow-gray-300 w-full z-20`}>
      <div className="flex justify-around items-center py-2">
        {/* Home Section */}
        <div className="flex flex-col items-center hover:cursor-pointer p-2 rounded-md" onClick={() => navigate(`/`)}>
          <Home className="m-auto" />
        </div>

        {/* Packages Section */}
        <div
          className="flex flex-col items-center hover:cursor-pointer p-2 rounded-md"
          onClick={() => (user.userType === 'Invester' ? navigate(`/plans`) : navigate(`/`))}
        >
          {user?.userType === 'Invester' ? <Wallet className="m-auto" /> : <Video className="m-auto" />}
        </div>

        {/* Plus Icon (Post Creation) */}
        <div
          onClick={() => fileInputRef.current.click()} // Trigger file input click
          className="flex flex-col items-center hover:cursor-pointer p-2 rounded-md"
        >
          <PlusSquare className="m-auto" />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*,video/*"
          onChange={handleFileSelection} // Handle file selection
        />

        {/* Recharge Section */}
        <div className="flex flex-col items-center hover:cursor-pointer p-2 rounded-md" onClick={() => navigate('/all-recharge')}>
          <RefreshCw className="m-auto" />
        </div>

        {/* Profile Section */}
        <div
          className="flex flex-col items-center hover:cursor-pointer p-2 rounded-md"
          onClick={() => navigate(`/profile/${user?._id}`)}
        >
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.profilePicture} alt="@shadcn" />
            <AvatarFallback src={avatar} />
          </Avatar>
        </div>

        {/* CreatePost Dialog */}
        <CreatePost open={open} setOpen={setOpen} file={selectedFile} setSelectedFile={setSelectedFile} />
      </div>
    </div>
  );
};

export default BottomNav;
