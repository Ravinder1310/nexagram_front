import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { toast, Toaster } from "react-hot-toast";
import { setAuthUser } from "@/redux/authSlice";
import axios from "axios";
import { setMessages } from "@/redux/chatSlice";
import avatar from "./images/avatar.png";
import Messages from "./Messages";
import { FaArrowLeft } from "react-icons/fa";
import sendLogo from "./images/message2.png";
import { Input } from "./ui/input";


const Profile = () => {
  const params = useParams();
  const userId = params.id;
// console.log("profile====>",userId);
  // Use hook to get user profile by ID
  useGetUserProfile(userId);

  const [activeTab, setActiveTab] = useState("posts");
  const dispatch = useDispatch();
  const { userProfile, user } = useSelector((store) => store.auth);
  const { onlineUsers, messages } = useSelector((store) => store.chat);
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenForImage, setDialogOpenForImage] = useState(false);

  const [followersList, setFollowersList] = useState([]);
  const [textMessage, setTextMessage] = useState("");
  const [followingList, setFollowingList] = useState([]);
  const [isFollowingProfile, setIsFollowingrofile] = useState(false);
  const [dialogType, setDialogType] = useState(""); // 'followers' or 'following'
  const [isMessaging, setIsMessaging] = useState(false);

  // Check if the logged-in user is visiting their own profile
  const isLoggedInUserProfile = user?._id === userProfile?._id;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleBackClick = () => {
    setIsMessaging(false); // Show message list when back button is clicked
  };




  const sendMessageHandler = async (receiverId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/message/send/${receiverId}`,
        { textMessage },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setMessages([...messages, res.data.newMessage]));
        setTextMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };



  const handleShowFollowers = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/user/${userId}/followers-following`,
        { withCredentials: true }
      );
      setFollowersList(res.data.followers);
      setDialogType("followers");
      setDialogOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowFollowing = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/user/${userId}/followers-following`,
        { withCredentials: true }
      );
      setFollowingList(res.data.following);
      setDialogType("following");
      setDialogOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const followUnfollowHandler = async () => {
    try {
      // Making the API call to follow/unfollow the user
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/followorunfollow/${
          userProfile?._id
        }`,
        { withCredentials: true }
      );

      // If the request was successful
      if (res.data.success) {
        toast.success(res.data.message);

        // Toggle the `isFollowing` state based on the current state
        setIsFollowingrofile((prevIsFollowing) => !prevIsFollowing);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("Error in followUnfollowHandler: ", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  let displayedPost = [];
  if (activeTab === "posts") {
    displayedPost = userProfile?.posts;
  } else if (activeTab === "saved") {
    displayedPost = userProfile?.bookmarks;
  } else if (activeTab === "reels") {
    displayedPost = userProfile?.posts?.filter(
      (post) => post.mediaType === "video"
    );
  }

  useEffect(() => {
    // console.log("profilr ====>",user)
    const fetchAllPost = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/isFollowing/${
            userProfile?._id
          }/${user?._id}`,
          { withCredentials: true }
        );
        // console.log("abc", response.data.isFollowing);
        setIsFollowingrofile(response.data.isFollowing);
        // console.log("tobeFollowed",userProfile);
        // console.log("whoFollowing",user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPost();
    console.log('--------',user);
    
  }, [user]);


  useEffect(() => {
    //  console.log("isMessage", isMessaging);
     
  },[isMessaging])

  return (
    <div className="sm:flex w-[100%] sm:justify-center pt-20">

      <Toaster />
      {
        isMessaging ? (
          <section className="flex-1 flex flex-col h-screen z-50 mb-40 sm:w-[100px] sm:ml-40">
          <div className="flex gap-3 items-center px-1 py-[10px] border-b border-gray-300 sticky top-0 bg-blue-500 z-10">
            <div className="rounded-[50%] bg-blue-500 p-1 shadow-xl shadow-">
              <FaArrowLeft onClick={handleBackClick} className="text-white" />
            </div>
            <Link
              to={`/profile/${userProfile?._id}`}
              className="flex items-center gap-2"
            >
              {userProfile?.profilePicture ? (
                <img
                  src={userProfile?.profilePicture}
                  className="w-10 h-10 rounded-[50%]"
                />
              ) : (
                <img
                  src={avatar}
                  alt="error"
                  className="w-10 h-10 rounded-[50%]"
                />
              )}

              <h1 className=" text-xl text-white font-mono">
                {userProfile?.username}
              </h1>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto bg-blue-200">
            <Messages selectedUser={userProfile} />
          </div>
          <div className="flex items-center py-4 px-1 bg-blue-200 relative">
            <Input
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              type="text"
              className="flex-1 focus-visible:ring-transparent rounded-[20px] pr-14 bg-white bg-opacity-50 backdrop-blur-md border border-gray-300"
              placeholder="Messages..."
            />
            <img
              className="absolute right-4 cursor-pointer w-9 h-9"
              onClick={() => sendMessageHandler(userProfile?._id)}
              src={sendLogo}
              alt="Send"
            />
          </div>
        </section>
        ) : (
<div className="flex flex-col gap-6 p-2 px-4 mb-20">
        <div className="flex justify-between items-center gap-4">
          <div className=" w-20">
            <Avatar
              className="cursor-pointer w-16 h-16"
              onClick={() => setDialogOpenForImage(true)}
            >
              <AvatarImage
                src={userProfile?.profilePicture}
                alt="profile_image"
              />
              <AvatarFallback src={avatar} />
            </Avatar>
          </div>
          <div>
            <div className="flex items-center text-center gap-4 ">
              <p className="font-mono">
                <span className="font-bold">{userProfile?.posts.length} </span>
                <br />
                posts
              </p>
              <p className="font-mono" onClick={handleShowFollowers}>
                <span className="font-bold">
                  {userProfile?.followers.length}{" "}
                </span>
                <br />
                followers
              </p>
              <p className="font-mono" onClick={handleShowFollowing}>
                <span className="font-bold">
                  {userProfile?.following.length}{" "}
                </span>
                <br />
                following
              </p>
            </div>
          </div>
        </div>
        <section>
          <div className="flex flex-col gap-1">
            <span className="font-bold">{userProfile?.username}</span>
            <span className="">{userProfile?.bio || "bio here..."}</span>
          </div>
        </section>
        <div className="flex items-center gap-4 justify-center w-[100%] m-auto">
          {isLoggedInUserProfile ? (
            <>
              <Link to="/account/edit">
                <Button variant="secondary" className="hover:bg-gray-200 h-8">
                  Edit profile
                </Button>
              </Link>
              
              {/* <Button
                variant="secondary"
                className="hover:bg-gray-200 h-8"
                
              >
                Log out
              </Button> */}
              {
                user?.userType === "Invester" ? (
                  <Button variant="secondary" className={` hover:bg-gray-200 h-8 flex `}>
                Archieved
              </Button>
                ) : (
                  <Button variant="secondary" className={` hover:bg-gray-200 h-8 flex `} onClick={() => {navigate('/influencer-packages')}}>
                Meta Verify
              </Button>
                )
              }
            </>
          ) : isFollowingProfile ? (
            // Optionally show something else here if needed
            <div className="flex gap-4">
              <Button
                className="bg-[#0095F6] hover:bg-[#3192d2] h-8"
                onClick={followUnfollowHandler}
              >
                Unfollow
              </Button>
              <Button className="bg-[#0095F6] hover:bg-[#3192d2] h-8" onClick={() => {setIsMessaging(!isMessaging)}}>
                Message
              </Button>
            </div>
          ) : (
            <Button
              className="bg-[#0095F6] hover:bg-[#3192d2] h-8"
              onClick={followUnfollowHandler}
            >
              Follow
            </Button>
          )}
        </div>
        <div className="border-t border-t-gray-200">
          <div className="flex items-center justify-between gap-10 text-sm px-6">
            <span
              className={`py-3 cursor-pointer ${
                activeTab === "posts" ? "font-bold" : ""
              }`}
              onClick={() => handleTabChange("posts")}
            >
              POSTS
            </span>
            <span
              className={`py-3 cursor-pointer ${
                activeTab === "saved" ? "font-bold" : ""
              }`}
              onClick={() => handleTabChange("saved")}
            >
              SAVED
            </span>
            <span
              className={`py-3 cursor-pointer ${
                activeTab === "reels" ? "font-bold" : ""
              }`}
              onClick={() => handleTabChange("reels")}
            >
              REELS
            </span>
          </div>
          <div className="grid grid-cols-3 gap-x-[1px] gap-y-[1px]">
            {displayedPost?.map((post) => {
              return (
                <div key={post?._id} className="relative group cursor-pointer">
                  {post.mediaType === "video" ? (
                    <div className="relative">
                      <video
                        className="w-full aspect-square object-cover"
                        src={post.media}
                        alt="post_video"
                        muted
                      />
                    </div>
                  ) : (
                    <img
                      className="w-full aspect-square object-cover"
                      src={post.media}
                      alt="post_img"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {dialogOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setDialogOpen(false)}
          >
            <div
              className=" w-[80%] max-w-lg p-4  rounded-xl bg-transparent backdrop-blur-3xl text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-bold">
                {dialogType === "followers" ? "Followers" : "Following"}
              </h2>
              <div className="mt-2 h-60 overflow-y-auto scrollbar-hidden">
                {" "}
                {/* Set fixed height and make scrollable */}
                {(dialogType === "followers"
                  ? followersList
                  : followingList
                ).map((user) => (
                  <div key={user._id} className="flex items-center my-2">
                    <Avatar className="w-10 h-10 mr-2">
                      <AvatarImage
                        src={user.profilePicture}
                        alt={user.username}
                      />
                      <AvatarFallback src={avatar} />
                    </Avatar>
                    <span className="font-serif">{user.username}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
        )
      }
      
      {dialogOpenForImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setDialogOpenForImage(false)}
        >
          <div
            className="bg-white rounded-[50%] w-[80%] h-[270px] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {userProfile?.profilePicture ? (
              <img
                src={userProfile?.profilePicture} // Ensure profile picture from userProfile
                alt="Large Profile"
                className="w-full h-[270px] object-cover rounded-[50%]"
              />
            ) : (
              <img
                src={avatar} // Ensure profile picture from userProfile
                alt="Large Profile"
                className="w-full h-[270px] object-cover rounded-[50%]"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
