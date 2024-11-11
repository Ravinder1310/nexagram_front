import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import "./MyTeam.css";
import Layout from "../MainLayout";

const MyTeam = () => {
  const [levelMembers, setLevelMembers] = useState([]);
  const [activeMember, setActiveMember] = useState(true);
  const [inputLevel, setInputLevel] = useState(1); // Input for level
  const [loading, setLoading] = useState(false); // Loading state
  const { user } = useSelector((store) => store.auth);

  const filterText = activeMember ? "Active Members" : "Unrecharged Members";

  // Function to get members for a specific level
  const getLevelMembers = async (level) => {
    if (!user?._id) return;
    setLoading(true); // Set loading to true before fetching data
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/invester/team-members/${
          user?._id
        }/${level}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setLevelMembers(result.data);
    } catch (error) {
      console.error("Error while fetching team members for level", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched or error occurs
    }
  };

  useEffect(() => {
    if (user) {
      getLevelMembers(inputLevel); // Fetch members for default level
    }
  }, [user, inputLevel]);

  const filteredTeamMembers = levelMembers.filter(
    (member) => member.isActive === activeMember
  );

  const handleLevelChange = (e) => {
    const level = parseInt(e.target.value);
    setInputLevel(level);
  };

  return (
      <div className="myTeamContainer py-24 pb-32 px-4 sm:w-2/5 bg-gradient-to-b text-black">
        <h1 className="font-serif text-2xl mb-16">My All Team</h1>
        <div className="memberStatus gap-2 block">
          <label
            htmlFor="levelInput "
            className="text-black font-bold text-xl text-left block"
          >
            Status{" "}
          </label>
          <select
            value={activeMember ? "active" : "unrecharged"}
            onChange={(e) => setActiveMember(e.target.value === "active")}
            className="selectDropdown w-full p-3 text-xl border-2 border-[#0d355b] rounded-xl mt-4"
          >
            <option value="active">Active Members</option>
            <option value="unrecharged">Unrecharged Members</option>
          </select>
        </div>
    
        <div className="levelInput text-black w-[100%] mt-8">
          <label
            htmlFor="levelInput"
            className="text-black font-bold text-xl text-left block"
          >
            Select Level (1-50)
          </label>
          <select
            id="levelInput"
            value={inputLevel}
            onChange={handleLevelChange}
            className="text-black border-2 border-black p-3 rounded-xl text-xl w-[100%] text-center mt-3"
          >
            {Array.from({ length: 50 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                Level {index + 1}
              </option>
            ))}
          </select>
        </div>
    
        <div className="px-4 w-[80%] m-auto py-2 rounded-lg flex flex-col justify-center border border-[#0d355b] items-center mt-8 text-xl font-semibold text-gray-500">
          <h2>Total Members: {levelMembers.length}</h2>
          <h2>
            {filterText}: {filteredTeamMembers.length}
          </h2>
        </div>
    
        {/* Loading Indicator */}
        {loading && (
          <div className="loadingContainer flex justify-center items-center mt-8">
            <p className="text-xl font-semibold text-gray-500">Loading...</p>
          </div>
        )}
    
        {/* No Data Message */}
        {!loading && filteredTeamMembers.length === 0 && (
          <div className="noDataMessage text-center mt-8 text-xl font-semibold text-gray-500">
            No users in this level.
          </div>
        )}
    
        {/* Team Table, shown only when not loading and there are members */}
        {!loading && filteredTeamMembers.length > 0 && (
          <div className="teamTable mx-auto mt-8 text-black w-full">
            <div className="overflow-x-auto bg-[#0d355b] p-2 rounded-lg">
              <table className="w-full table-fixed font-medium bg-[#0d355b] p-2 text-white">
                <thead>
                  <tr className="headTeamTH text-center font-medium text-sm text-white p-2">
                    <th className="w-20 whitespace-nowrap p-2">Sr No.</th>
                    <th className="w-32 whitespace-nowrap p-2">Direct Sponsor</th>
                    <th className="w-32 whitespace-nowrap p-2">Package</th>
                    <th className="w-32 whitespace-nowrap p-2">Direct Business</th>
                    <th className="w-32 whitespace-nowrap p-2">Team Size</th>
                    <th className="w-32 whitespace-nowrap p-2">Team Business</th>
                    <th className="w-32 whitespace-nowrap p-2">Registered At</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeamMembers?.map((member, index) => (
                    <tr
                      className="thteamInvite border-b border-gray-400 text-white"
                      key={member._id}
                    >
                      <td className=" p-2">{index + 1}</td>
                      <td className=" p-2">{member.referralCode}</td>
                      <td className=" p-2">$ {member.rechargeWallet}</td>
                      <td className=" p-2">$ {member.directBussiness}</td>
                      <td className=" p-2"> {member.teamSize || 0 }</td>
                      <td className=" p-2">$ {member.teamBusiness || 0}</td>
                      <td className=" p-2">{moment(member.createdAt).format("YYYY-MM-DD")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
    
};

export default MyTeam;
