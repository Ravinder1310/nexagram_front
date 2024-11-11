import React, { useEffect } from 'react'
import Posts from './Posts'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { setAuthUser } from '@/redux/authSlice';
import { setPosts, setSelectedPost } from '@/redux/postSlice';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const Feed = () => {

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
        toast.success(res.data.message);
        // Moved navigate here after dispatches and toast
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response);
    }
  };


  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/verify-token`,
          { withCredentials: true }
        );
        if (res.data.success) {
          console.log("Token is valid");
        } else {
          logoutHandler(); // If token is invalid, log out
        }
      } catch (error) {
        console.log("Token verification failed:", error);
        logoutHandler(); // Log out if there's an error in verification
      }
    };
  
    verifyToken();
  }, []);


  return (
    <div className='flex-1 flex flex-col items-center md:pl-[20%]'>
        <Posts/>
    </div>
  )
}

export default Feed