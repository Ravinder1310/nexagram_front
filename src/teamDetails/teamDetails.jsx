import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import "./TeamDetails.css";

const TeamDetails = () => {
  const [selectedLeg, setSelectedLeg] = useState("power");
  const [powerLeg, setPowerLeg] = useState([]);
  const [weekLeg, setWeekLeg] = useState([]);
  const [weekLegBusiness, setWeekLegBusiness] = useState(0);
  const [powerLegBusiness, setPowerLegBusiness] = useState(0);
  const [powerTeam, setPowerTeam] = useState(0);
  const [weekTeam, setWeekTeam] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activePower, setActivePower] = useState(0);
  const [activeWeek, setActiveWeek] = useState(0);
  const { user } = useSelector((store) => store.auth);

  const getLegDetails = async () => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/invester/power-leg/${user?._id}`
      );
      setPowerLeg(res.data.powerUserLeg);
      setWeekLeg(res.data.weakLegUsers);

      let totalWeekBusiness = 0;
      let totalWeekTeam = 0;
      let totalPowerTeam = 0;
      let totalActivePower = 0;
      let totalActiveWeek = 0;


      for(let i=0;i<res.data.powerUserLeg.length;i++){

        totalPowerTeam += res.data.powerUserLeg[i].teamSize;
        if(res.data.powerUserLeg[i].isActive){
            totalActivePower++;
        }
        
      }
      setActivePower(totalActivePower);

      for(let i=0;i<res.data.weakLegUsers.length;i++){
        totalWeekBusiness += res.data.weakLegUsers[i].teamBusiness;
        totalWeekBusiness += res.data.weakLegUsers[i].totalInvestment;
        totalWeekTeam += res.data.weakLegUsers[i].teamSize;
        if(res.data.weakLegUsers[i].isActive){
          totalActiveWeek++;
      }
      }
      setWeekLegBusiness(totalWeekBusiness);
      setWeekTeam(totalWeekTeam + res.data.weakLegUsers.length)
      setPowerTeam(totalPowerTeam)
      setActiveWeek(totalActiveWeek);
      setPowerLegBusiness(res.data.powerUserLeg[0].teamBusiness + res.data.powerUserLeg[0].totalInvestment)
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  useEffect(() => {
    getLegDetails();
    console.log(weekLegBusiness);
    
  }, []);

  const filteredTeamMembers = selectedLeg === "power" ? powerLeg : weekLeg;

  return (
    <div className="myTeamContainer py-24 pb-32 px-4 sm:w-2/5 bg-gradient-to-b text-black">
      <h1 className="font-serif text-2xl mb-16">Team Details</h1>
      <div className="memberStatus gap-2 block">
        <label
          htmlFor="levelInput"
          className="text-black font-bold text-xl text-left block"
        >
          Select Leg
        </label>
        <select
          value={selectedLeg}
          onChange={(e) => setSelectedLeg(e.target.value)}
          className="selectDropdown w-full p-3 text-xl border-2 border-[#0d355b] rounded-xl mt-4"
        >
          <option value="power">Power Leg</option>
          <option value="week">Week Leg</option>
        </select>
      </div>

      <div className="px-4 w-[80%] m-auto py-2 rounded-lg flex flex-col justify-center border border-[#0d355b] items-center mt-8 text-xl font-semibold text-gray-500">
          <h2>Total Business: $ {selectedLeg == "week" ? weekLegBusiness : powerLegBusiness}</h2>
          {
            selectedLeg == "week" ? (
                <h2>
                Total Members : {weekTeam}
              </h2>
            ): (
              <h2>
                Total Members : {powerTeam + 1}
              </h2>
            )
          }
          {/* {
            selectedLeg == "week" ? (
              <>
                <h2>
                Active Members : {activeWeek}
              </h2>
              <h2>
              Inactive Members : {weekTeam - activeWeek}
            </h2>
            </>
            ): (
              <>
                <h2>
                Active Members : {activePower}
              </h2>
              <h2>
              Inactive Members : {powerTeam - activeWeek}
            </h2>
            </>
            )
          } */}
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
                  {/* <th className="w-32 whitespace-nowrap p-2">Direct Business</th> */}
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
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{member.referralCode}</td>
                    <td className="p-2">$ {member.rechargeWallet}</td>
                    {/* <td className="p-2">$ {member.directBussiness}</td> */}
                    <td className="p-2">{member.teamSize || 0}</td>
                    <td className="p-2">$ {member.teamBusiness || 0}</td>
                    <td className="p-2">
                      {moment(member.createdAt).format("YYYY-MM-DD")}
                    </td>
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

export default TeamDetails;
