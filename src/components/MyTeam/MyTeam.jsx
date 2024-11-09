import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment"; // Ensure moment is installed
import "./MyTeam.css";
import Layout from "../MainLayout"

const MyTeam = () => {
  const [levelMembers, setLevelMembers] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [activeMember, setActiveMember] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(1);
  const { user } = useSelector(store => store.auth);

  const navigate = useNavigate();
  const filterText = activeMember ? "Active Members" : "Unrecharged Members";

  // Function to get members for a specific level
  const getLevelMembers = async (level) => {
    if (!user?._id) return;
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/invester/team-members/${user._id}/${level}`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      console.log("response ====>",result.data)
      setLevelMembers(result.data);
    } catch {
      console.error("Error while fetching team members for level");
    }
  };

  // Function to get all members across all levels
  const getAllMembers = async () => {
    if (!user?._id) return;
    try {
      const allLevelsResult = await Promise.all(
        [1, 2, 3, 4, 5].map((level) =>
          axios.get(
            `${import.meta.env.VITE_API_URL}/api/v1/invester/team-members/${user._id}/${level}`,
            { withCredentials: true }
          )
        )
      );

      // Combine results from all levels
      const combinedResults = allLevelsResult.flatMap((result) => result.data);
      setAllMembers(combinedResults);
      setTotalMembers(combinedResults.length);
    } catch {
      console.error("Error while fetching all team members");
    }
  };

  useEffect(() => {
    if (user) {
      getLevelMembers(currentLevel);
      getAllMembers();
    }
  }, [user, currentLevel]);

  const filteredTeamMembers = levelMembers.filter(
    (member) => member.isActive === activeMember
  );


  console.log("filtered mambers =====?",filteredTeamMembers)
  return (
          <div className="myTeamContainer py-24 sm:w-2/5 bg-gradient-to-b text-black">
             
           
        <div className="memberStatus p-4 gap-2">
          <button
            onClick={() => setActiveMember(true)}
            className={activeMember ? "activeButton" : ""}
          >
            Active Member
          </button>
          <button
            onClick={() => setActiveMember(false)}
            className={!activeMember ? "activeButton" : ""}
          >
            Unrecharged Member
          </button>
        </div>
        <div className="px-4 flex flex-col justify-center items-center">
          <h2>Total Members: {totalMembers}</h2>
          <h2>{filterText}: {filteredTeamMembers.length}</h2>
        </div>
        <div className="actMemb gap-4 p-4">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              onClick={() => setCurrentLevel(level)}
              className={currentLevel === level ? "activeButton" : ""}
            >
              {`Level ${String.fromCharCode(64 + level)} (${level * 10}%)`}
            </button>
          ))}
        </div>
        <div className="teamTable">
          <table>
            <thead>
              <tr className="headTeamTH text-black">
                <th>Sr No.</th>
                <th>Phone No</th>
                <th>Direct Sponser</th>
                <th>Registered At</th>
                {/* <th>Packages</th> */}
              </tr>
            </thead>
            <tbody>
              {filteredTeamMembers.map((member,index) => (
                <tr className="thteamInvite text-black" key={member._id}>
                  <td>{index+1}</td>
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


