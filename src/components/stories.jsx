import React from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FaPlusCircle } from "react-icons/fa"; // Import the plus icon
import avatar from "./images/avatar.png";

const Stories = () => {
  const { allUsers } = useSelector((store) => store.auth);
  const { user } = useSelector((store) => store.auth);

  // Separate the logged-in user from the list and place them first
  const reorderedUsers = [
    ...(user ? [user] : []), // Add the logged-in user at the start if available
    ...allUsers?.filter((singleUser) => singleUser?._id !== user?._id), // Add remaining users
  ];

  return (
    <>
      <section className="w-full p-0 pt-20 sm:pt-10 sm:ml-60">
        <div
          className="flex p-2 gap-2 overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // For Firefox and IE/Edge
        >
          <style>
            {`
              /* Hide scrollbar for Chrome, Safari, and Opera */
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
              /* Hide scrollbar for Firefox */
              .hide-scrollbar {
                scrollbar-width: none;
              }
            `}
          </style>

          {reorderedUsers?.map((singleUser) => {
            return (
              <div
                className="text-center w-[80px] h-[110px] flex-shrink-0 relative"
                key={singleUser?._id}
              >
                <div className="relative inline-block">
                  <Avatar className="w-14 h-14 m-auto">
                    <AvatarImage src={singleUser?.profilePicture} />
                    <AvatarFallback src={avatar} />
                  </Avatar>

                  {/* Show the plus icon only for the logged-in user */}
                  {singleUser?._id === user?._id && (
                    <FaPlusCircle
                      className="absolute bottom-0 right-0 text-blue-500"
                      size={18}
                    />
                  )}
                </div>
                {/* Display the username for the logged-in user */}
                {singleUser?._id === user?._id ? (
                  <h1 className="font-semibold text-sm">{singleUser?.username}</h1>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Stories;
