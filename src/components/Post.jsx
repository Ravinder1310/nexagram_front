import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { Badge } from "./ui/badge";

const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
  const [postLike, setPostLike] = useState(post.likes.length);
  const [comment, setComment] = useState(post.comments);
  const dispatch = useDispatch();
  const [views, setViews] = useState(post.views || 0);
  const videoRef = useRef(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // State for video mute functionality
  const [isMuted, setIsMuted] = useState(false);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/post/${post._id}/${action}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);

        // Update post in state
        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const commentHandler = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/post/${post._id}/comment`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id === post._id ? { ...p, comments: updatedCommentData } : p
        );

        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/post/delete/${post?._id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedPostData = posts.filter(
          (postItem) => postItem?._id !== post?._id
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const bookmarkHandler = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/post/${post?._id}/bookmark`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVideoPlay = async () => {
    console.log("Video is playing");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/post/${post._id}/view`,
        { user },
        { withCredentials: true }
      );
      if (res.data.success) {
        setViews(res.data.views);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.muted = !isMuted; // Mute or unmute based on current state
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    // Set up the Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.play().catch((err) => console.error(err)); // Play the video if it comes into view
          } else {
            videoElement.pause(); // Pause the video if it's out of view
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the video is in view
      }
    );

    if (videoElement) {
      observer.observe(videoElement); // Observe the video element
    }

    // Cleanup function to unobserve the video element
    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, [userInteracted]);


  useEffect(() => {
    const checkFollowing = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/isFollowing/${post.author._id}`,
          { withCredentials: true }
        );
        setIsFollowing(res.data.isFollowing);
      } catch (error) {
        console.log(error);
      }
    };
    if (user && post.author._id !== user._id) {
      checkFollowing();
    }
  }, [post.author._id, user]);

  return (
    <div className="my-12 w-full max-w-sm mx-auto">
      <div className="flex items-center px-2 justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={post.author?.profilePicture} alt="post_image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-3">
            <h1>{post.author?.username}</h1>
            {user?._id === post.author._id && (
              <Badge variant="secondary">Author</Badge>
            )}
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            {post?.author?._id !== user?._id && (
              <Button
                variant="ghost"
                className="cursor-pointer w-fit text-[#ED4956] font-bold"
              >
                Unfollow
              </Button>
            )}
            <Button variant="ghost" className="cursor-pointer w-fit">
              Add to favorites
            </Button>
            {user && user?._id === post?.author._id && (
              <Button
                onClick={deletePostHandler}
                variant="ghost"
                className="cursor-pointer w-fit"
              >
                Delete
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Render media based on type */}
      {post.mediaType === "video" ? (
        <div className="relative">
          <video
            ref={videoRef}
            className="rounded-sm my-2 w-full aspect-square object-cover"
            src={post.media}
            alt="post_video"
            // autoPlay
            loop
            muted={isMuted} // Ensure the video is muted by default
            playsInline
            onPlay={handleVideoPlay}
            onClick={toggleMute}
            // controls
          />
          {/* Mute button */}
          <button
            className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-md"
            onClick={toggleMute}
          >
            {isMuted ? (
              <span role="img" aria-label="Mute">
                🔇
              </span> // Mute icon
            ) : (
              <span role="img" aria-label="Unmute">
                🔊
              </span> // Unmute icon
            )}
          </button>
        </div>
      ) : (
        <img
          className="rounded-sm my-2 w-full aspect-square object-cover"
          src={post.media}
          alt="post_img"
        />
      )}

      <div className="flex items-center justify-between my-2 px-2">
        <div className="flex items-center gap-3">
          {liked ? (
            <FaHeart
              onClick={likeOrDislikeHandler}
              size={"24"}
              className="cursor-pointer text-red-600"
            />
          ) : (
            <FaRegHeart
              onClick={likeOrDislikeHandler}
              size={"22px"}
              className="cursor-pointer hover:text-gray-600"
            />
          )}

          <MessageCircle
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
            className="cursor-pointer hover:text-gray-600"
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark
          onClick={bookmarkHandler}
          className="cursor-pointer hover:text-gray-600"
        />
      </div>
      <div className="flex justify-between pr-1">
        <span className="font-medium block mb-0 px-2">{postLike} likes</span>
        {
          post.mediaType === "video" ? (
<span className="cursor-pointer text-sm text-gray-400 px-2">
          {post.views} views
        </span>
          ) : (<></>)
        }
        
      </div>

      <p className="px-2">
        <span className="font-medium mr-2">{post.author?.username}</span>
        {post.caption}
      </p>
      {comment.length > 0 && (
        <span
          onClick={() => {
            dispatch(setSelectedPost(post));
            setOpen(true);
          }}
          className="cursor-pointer text-sm text-gray-400 px-2"
        >
          View all {comment.length} comments
        </span>
      )}
      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex items-center justify-between px-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={changeEventHandler}
          className="outline-none text-sm w-full"
        />
        {text && (
          <span
            onClick={commentHandler}
            className="text-[#3BADF8] cursor-pointer"
          >
            Post
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
