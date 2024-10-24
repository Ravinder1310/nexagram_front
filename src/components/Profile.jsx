import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import useGetUserProfile from '@/hooks/useGetUserProfile';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { setPosts, setSelectedPost } from '@/redux/postSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AtSign, Heart, MessageCircle } from 'lucide-react';
import { setAuthUser } from '@/redux/authSlice'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState('posts');
  const dispatch = useDispatch();
  const {posts} = useSelector(store=>store.post);
  const navigate = useNavigate()

  const { userProfile, user } = useSelector(store => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = false;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }

  const logoutHandler = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/logout`, { withCredentials: true });
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
}

  let displayedPost = [];
  if(activeTab === 'posts'){
     displayedPost = userProfile?.posts
  }else if(activeTab === "saved"){
     displayedPost = userProfile?.bookmarks
  }else if(activeTab === "reels"){
     displayedPost = posts?.filter(post => post.mediaType === 'video');
  }

  return (
    <div className='sm:flex w-[100%] sm:justify-center pt-20'>
      <Toaster/>
      <div className='flex flex-col gap-6 p-2 px-4 mb-20'>
        <div className='flex justify-between items-center gap-4'>
          <div className=' w-20 pr-3'>
            <Avatar className='h-20 w-20'>
              <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div>
              <div className='flex items-center text-center gap-4'>
                <p className='font-semibold'><span className='font-bold'>{userProfile?.posts.length} </span>posts</p>
                <p className='font-semibold'><span className='font-bold'>{userProfile?.followers.length} </span>followers</p>
                <p className='font-semibold'><span className='font-bold'>{userProfile?.following.length} </span>following</p>
              </div>
          </div>
        </div>
       <section>
       <div className='flex flex-col gap-1'>
                <span className='font-bold'>{userProfile?.username}</span>
                <span className=''>{userProfile?.bio || 'bio here...'}</span>
                <span>🦾 Just need to take a risky step</span>
                <span>🕛 It will change the life</span>
                <span>☑️ DM for collaboration</span>
              </div>
       </section>
        <div className='flex items-center gap-5 justify-center w-[80%] m-auto'>
                {
                  isLoggedInUserProfile ? (
                    <>
                      <Link to="/account/edit"><Button variant='secondary' className='hover:bg-gray-200 h-8'>Edit profile</Button></Link>
                      <Button variant='secondary' className='hover:bg-gray-200 h-8'>View archive</Button>
                      <Button variant='secondary' className='hover:bg-gray-200 h-8' onClick={logoutHandler}>Log out</Button>
                    </>
                  ) : (
                    isFollowing ? (
                      <>
                        <Button variant='secondary' className='h-8'>Unfollow</Button>
                        <Button variant='secondary' className='h-8'>Message</Button>
                      </>
                    ) : (
                      <Button className='bg-[#0095F6] hover:bg-[#3192d2] h-8'>Follow</Button>
                    )
                  )
                }
              </div>
        <div className='border-t border-t-gray-200'>
          <div className='flex items-center justify-center gap-10 text-sm'>
            <span className={`py-3 cursor-pointer ${activeTab === 'posts' ? 'font-bold' : ''}`} onClick={() => handleTabChange('posts')}>
              POSTS
            </span>
            <span className={`py-3 cursor-pointer ${activeTab === 'saved' ? 'font-bold' : ''}`} onClick={() => handleTabChange('saved')}>
              SAVED
            </span>
            <span className={`py-3 cursor-pointer ${activeTab === 'reels' ? 'font-bold' : ''}`} onClick={() => handleTabChange('reels')}>
              REELS
              </span>
            <span className='py-3 cursor-pointer'>TAGS</span>
          </div>
          <div className='grid grid-cols-3 gap-1'>
            {
              displayedPost?.map((post) => {
                return (
                  <div key={post?._id} className='relative group cursor-pointer'>
                     {post.mediaType === "video" ? (
        <div className="relative">
          <video
            // ref={videoRef}
            className="rounded-sm my-2 w-full aspect-square object-cover"
            src={post.media}
            alt="post_video"
            // autoPlay
            // loop
            muted={true} // Ensure the video is muted by default
            // playsInline
            // onPlay={handleVideoPlay}
            // onClick={toggleMute}
            // controls
          />
          {/* Mute button */}
        </div>
      ) : (
        <img
          className="rounded-sm my-2 w-full aspect-square object-cover"
          src={post.media}
          alt="post_img"
        />
      )}
                    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      <div className='flex items-center text-white space-x-4'>
                        <button className='flex items-center gap-2 hover:text-gray-300'>
                          <Heart />
                          <span>{post?.likes.length}</span>
                        </button>
                        <button className='flex items-center gap-2 hover:text-gray-300'>
                          <MessageCircle />
                          <span>{post?.comments.length}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile