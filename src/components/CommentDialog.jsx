import React, { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import axios from "axios";
import { toast } from "sonner";
import { setPosts } from "@/redux/postSlice";
import avatar from "./images/avatar.png";

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");
  const { selectedPost, posts } = useSelector((store) => store.post);
  const [comment, setComment] = useState([]);
  const dispatch = useDispatch();
  const inputRef = useRef(null); // Create a ref for the input field

  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments);
    }

    // Remove automatic focus when the dialog opens
    if (inputRef.current) {
      inputRef.current.blur(); // Ensure the input is not focused when dialog opens
    }
  }, [selectedPost, open]);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const sendMessageHandler = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/post/${
          selectedPost?._id
        }/comment`,
        { text },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id === selectedPost._id
            ? { ...p, comments: updatedCommentData }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="w-[80%] h-[auto] p-4 flex flex-col rounded-xl bg-transparent backdrop-blur-2xl text-white"
      >
        <div className="block sm:flex flex-1">
          <div className="w-full">
            {selectedPost?.mediaType === "video" ? (
              <div className="relative">
                <video
                  className="rounded-sm w-full aspect-square object-cover"
                  src={selectedPost?.media}
                  autoPlay
                  alt="post_video"
                  loop
                  muted={true}
                  playsInline
                />
              </div>
            ) : (
              <img
                className="rounded-sm w-full aspect-square object-cover"
                src={selectedPost?.media}
                alt="post_img"
              />
            )}
          </div>
          <div className="w-full flex flex-col justify-between">
            <div className="flex items-center justify-between py-2">
              <div className="flex gap-3 items-center">
                <Link>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={selectedPost?.author?.profilePicture} />
                    <AvatarFallback src={avatar} />
                  </Avatar>
                </Link>
                <div>
                  <Link className="font-semibold text-xs">
                    {selectedPost?.author?.username}
                  </Link>
                </div>
              </div>

              {/* <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center text-sm text-center">
                  <div className="cursor-pointer w-full text-[#ED4956] font-bold">
                    Unfollow
                  </div>
                  <div className="cursor-pointer w-full">Add to favorites</div>
                </DialogContent>
              </Dialog> */}
            </div>
            <hr className="mb-2 mt-2" />
            <div
              className=" overflow-y-auto h-28 text-white"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {comment.length > 0 ? (
                comment.map((comment) => (
                  <Comment key={comment._id} comment={comment} />
                ))
              ) : (
                <p className="text-white mt-8 font-bold">No comments yet</p>
              )}
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={text}
                  onChange={changeEventHandler}
                  placeholder="Add a comment..."
                  ref={inputRef} // Attach the ref to the input
                  className="w-full outline-none border text-sm border-gray-300 text-black p-2 rounded"
                />
                <Button
                  disabled={!text.trim()}
                  onClick={sendMessageHandler}
                  variant="outline"
                  style={{ color: "white", backgroundColor: "black" }} // Change the text color to blue
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
