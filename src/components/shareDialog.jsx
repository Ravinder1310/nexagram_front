import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import axios from 'axios';

const ShareDialog = ({ opened, setOpened, post }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Search for users by username
  useEffect(() => {
    const searchUsers = async () => {
      if (searchTerm.length > 0) {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/search`, {
            params: { query: searchTerm },
            withCredentials: true
          });
          if (res.data.success) {
            setSearchResults(res.data.users); // assuming API returns 'users' array
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        setSearchResults([]); // clear results if search term is empty
      }
    };
    const debounceTimeout = setTimeout(searchUsers, 500); // Debouncing

    return () => clearTimeout(debounceTimeout); // Clear debounce timeout
  }, [searchTerm]);

  const sharePost = async (userId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/chat/sharePost`,
        { postId: post._id, recipientId: userId },
        { withCredentials: true }
      );
      if (res.data.success) {
        setOpened(false); // Close the dialog
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog opened={opened} onOpenChange={setOpened}>
      <DialogContent>
        <input 
          type="text" 
          placeholder="Search users..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border w-full p-2 rounded"
        />
        <div className="mt-4">
          {searchResults.map(user => (
            <div 
              key={user._id} 
              onClick={() => sharePost(user._id)}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
            >
              <Avatar>
                <AvatarImage src={user.profilePicture} alt="User Image" />
                <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <span>{user.username}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
