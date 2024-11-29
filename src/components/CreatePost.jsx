import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { readFileAsDataURL } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '@/redux/postSlice';
import avatar from "./images/avatar.png"

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [mediaPreview, setMediaPreview] = useState(""); // renamed to mediaPreview
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);
  const { posts } = useSelector(store => store.post);
  const dispatch = useDispatch();

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setMediaPreview(dataUrl); // updated to set media preview
    }
  }

  const createPostHandler = async (e) => {
    const formData = new FormData();
    formData.append("caption", caption);
    if (file) formData.append("media", file); // Correctly appending the file as 'media'
    
    
    try {
        setLoading(true);

        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/post/addpost`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });
        if (res.data.success) {
    // console.log('---->',  res.data.post)
          
            dispatch(setPosts([res.data.post, ...posts]));
            toast.success(res.data.message);
            setFile("");
            setCaption("");
            setMediaPreview("");
            setOpen(false);
        }
    } catch (error) {
        toast.error(error.response.data.message);
    } finally {
        setLoading(false);
    }
}


  return (
    <Dialog open={open}>
      <DialogContent
  onInteractOutside={() => setOpen(false)}
  className="w-[80%] h-auto rounded-lg bg-transparent backdrop-blur-2xl text-white" // Adding backdrop blur
>
        <DialogHeader className='text-center font-semibold'>Create New Post</DialogHeader>
        <div className='flex gap-3 items-center'>
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="img" />
            <AvatarFallback src={avatar} />
          </Avatar>
          <div className=''>
            <h1 className='font-semibold text-xs'>{user?.username}</h1>
            <span className='text-white text-xs'>Bio here...</span>
          </div>
        </div>
        <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="focus-visible:ring-transparent border-none text-black" placeholder="Write a caption..." />
        {
          mediaPreview && (
            <div className='w-full h-64 flex items-center justify-center'>
              {file?.type.startsWith('video/') ? (
                <video src={mediaPreview} controls className='object-cover h-full w-full rounded-md' />
              ) : (
                <img src={mediaPreview} alt="preview_img" className='object-cover h-full w-full rounded-md' />
              )}
            </div>
          )
        }
        <input ref={imageRef} type='file' className='hidden' onChange={fileChangeHandler} accept="image/*,video/*" /> {/* accept images and videos */}
        <Button onClick={() => imageRef.current.click()} className='w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf] '>Select from computer</Button>
        {
          mediaPreview && (
            loading ? (
              <Button>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Please wait
              </Button>
            ) : (
              <Button onClick={createPostHandler} type="submit" className="w-full">Post</Button>
            )
          )
        }
      </DialogContent>
    </Dialog>
  )
}

export default CreatePost;
