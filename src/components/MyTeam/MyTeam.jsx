import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux';
import moment from "moment";
import "./MyTeam.css";
import Layout from "../MainLayout";

const MyTeam = () => {
  const [levelMembers, setLevelMembers] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [activeMember, setActiveMember] = useState(true);
  const [inputLevel, setInputLevel] = useState(1); // Input for level
  const { user } = useSelector(store => store.auth);

  const filterText = activeMember ? "Active Members" : "Unrecharged Members";

  // Function to get members for a specific level
  const getLevelMembers = async (level) => {
    if (!user?._id) return;
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/invester/team-members/672879738b49ed071cad7de8/${level}`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      setLevelMembers(result.data);
    } catch (error) {
      console.error("Error while fetching team members for level", error);
    }
  };

  // Function to get all members across all levels
  const getAllMembers = async () => {
    if (!user?._id) return;
    try {
      const allLevelsResult = await Promise.all(
        [1, 2, 3, 4, 5].map((level) =>
          axios.get(
            `${import.meta.env.VITE_API_URL}/api/v1/invester/team-members/672879738b49ed071cad7de8/${level}`,
            { withCredentials: true }
          )
        )
      );

      // Combine results from all levels
      const combinedResults = allLevelsResult.flatMap((result) => result.data);
      setAllMembers(combinedResults);
      setTotalMembers(combinedResults.length);
    } catch (error) {
      console.error("Error while fetching all team members", error);
    }
  };

  useEffect(() => {
    if (user) {
      getLevelMembers(inputLevel); // Fetch members for default level
      getAllMembers();
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
    <div className="myTeamContainer py-24 sm:w-2/5 bg-gradient-to-b text-black">
      <div className="memberStatus p-4 gap-2">
        <button
          onClick={() => setActiveMember(true)}
          className={activeMember ? "activeButton" : ""}
        >
          Active Members
        </button>
        <button
          onClick={() => setActiveMember(false)}
          className={!activeMember ? "activeButton" : ""}
        >
          Unrecharged Members
        </button>
      </div>
      <div className="px-4 flex flex-col justify-center items-center">
        <h2>Total Members: {totalMembers}</h2>
        <h2>{filterText}: {filteredTeamMembers.length}</h2>
      </div>
      
      {/* Input for selecting level */}
      <div className="levelInput text-black w-[100%] mt-10">
        <label htmlFor="levelInput " className="text-black text-left fontbold">Enter Level (1-50) </label>
        <input
          type="number"
          id="levelInput"
          value={inputLevel}
          onChange={handleLevelChange}
          min="1"
          max="5"
          className="text-black border-2 border-black p-2 rounded-full w-[90%] text-center mt-3"
        />
      </div>

      <div className="teamTable">
        <table>
          <thead>
            <tr className="headTeamTH text-black">
              <th>Sr No.</th>
              <th>Phone No</th>
              <th>Direct Sponser</th>
              <th>Registered At</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeamMembers.map((member, index) => (
              <tr className="thteamInvite text-black" key={member._id}>
                <td>{index + 1}</td>
                <td>{member.phone}</td>
                <td>{member.referralCode}</td>
                <td>{moment(member.createdAt).format("YYYY-MM-DD")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTeam;
