import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import moment from "moment";


const RankIncomes = () => {

  const { user } = useSelector((store) => store.auth);
  const [rankIncomeHistory, setRankIncomeHistory] = useState([]);

  const getRankIncomeHistory = async () => {
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/invester/rank-income-history/${user?._id}`
      );
      console.log(res.data.data);
      setRankIncomeHistory(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };


  useEffect(() => {
    getRankIncomeHistory();
  }, []);

  return (
    <div className='p-4 pt-20 pb-28'>
        <h1 className='text-center text-2xl font-mono'>Royality Income</h1>
        <div className="teamTable mx-auto mt-8 text-black w-full">
        <div className="overflow-x-auto bg-[#0d355b] p-2 rounded-lg">
          <table className="w-full table-fixed font-medium bg-[#0d355b] p-2 text-white">
            <thead>
              <tr className="headTeamTH text-center font-medium text-sm text-white p-2">
                <th className="w-20 whitespace-nowrap p-2">Sr No.</th>
                <th className="w-32 whitespace-nowrap p-2">Rank</th>
                <th className="w-32 whitespace-nowrap p-2">Amount</th>
                {/* <th className="w-32 whitespace-nowrap p-2">Direct Business</th> */}
                <th className="w-32 whitespace-nowrap p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {rankIncomeHistory.length !== 0 ? (
                rankIncomeHistory?.map((rank, index) => (
                  <tr
                    className="thteamInvite border-b text-center border-gray-400 text-white"
                    key={rank?._id}
                  >
                    <td className=" p-2">{index + 1}</td>
                    <td className=" p-2">{rank?.rank}</td>
                    <td className=" p-2">
                      $ {parseFloat(rank?.amount).toFixed(2)}
                    </td>
                    <td className=" p-2">
                      {moment(rank?.createdAt).format("YYYY-MM-DD")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="thteamInvite border-b text-center border-gray-400 text-white">
                  <td colSpan="4" className="py-4 px-2 text-center">
                    No Rank income yet
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

export default RankIncomes