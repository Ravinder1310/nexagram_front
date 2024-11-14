import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const LikeIncome = () => {

    const { user } = useSelector((store) => store.auth);
    const [likeIncomeHistory, setLikeIncomeHistory] = useState([]);
  
    const getDailyIncomeHistory = async () => {
      try {
        let res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/post/like-history/${
            user?._id
          }`,{withCredentials: true}
        );
        console.log("liked------------------------------------",res.data.data);
        setLikeIncomeHistory(res.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
  
    useEffect(() => {
      getDailyIncomeHistory();
    }, []);


  return (
    <div className="p-4 pt-20 pb-28">
      <h1 className="text-center text-2xl font-mono">Like Income</h1>
      <div className="teamTable mx-auto mt-8 text-black w-full">
        <div className="overflow-x-auto bg-[#0d355b] p-2 rounded-lg">
          <table className="w-full table-fixed font-medium bg-[#0d355b] p-2 text-white">
            <thead>
              <tr className="headTeamTH text-center font-medium text-sm text-white p-2">
                <th className="w-20 whitespace-nowrap p-2">Sr No.</th>
                <th className="w-32 whitespace-nowrap p-2">User</th>
                <th className="w-32 whitespace-nowrap p-2">Post</th>
                <th className="w-32 whitespace-nowrap p-2">Income</th>
                {/* <th className="w-32 whitespace-nowrap p-2">Direct Business</th> */}
                <th className="w-32 whitespace-nowrap p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {likeIncomeHistory.length !== 0 ? (
                likeIncomeHistory?.map((income, index) => (
                  <tr
                    className="thteamInvite border-b text-center border-gray-400 text-white"
                    key={income._id}
                  >
                    <td className=" p-2">{index + 1}</td>
                    <td className=" p-2">{income?.userPostLiked?.username}</td>
                    <td className=" p-2">{
                         (income?.postId?.mediaType === "video" ? (
                            <div className="relative text-center">
                              <video
                                // ref={videoRef}
                                className="rounded-sm m-auto my-2 w-16 aspect-square object-cover"
                                src={income?.postId?.media}
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
                              className="rounded-sm m-auto my-2 w-16 aspect-square object-cover"
                              src={income?.postId?.media}
                              alt="post_img"
                            />
                          ))
                        }</td>
                    <td className=" p-2">
                      $ {income?.amount}
                    </td>
                    <td className=" p-2">
                      {moment(income?.createdAt).format("YYYY-MM-DD")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="thteamInvite border-b text-center border-gray-400 text-white">
                  <td colSpan="4" className="py-4 px-2 text-center">
                    No Revenue income yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default LikeIncome