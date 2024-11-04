import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

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
    <div className='p-4 pt-20'>
        <h1 className='text-center text-2xl font-mono'>Royality Income</h1>
        <table className="min-w-full bg-white border mt-10">
          <thead>
            <tr>
              <th className=" border-2 border-black ">Sr No</th>
              <th className=" border-2 border-black ">Rank</th>
              <th className=" border-2 border-black ">Amount</th>
              <th className=" border-2 border-black ">Date</th>
            </tr>
          </thead>  
          <tbody>
            {rankIncomeHistory?.length > 0 ? (
              rankIncomeHistory?.map((rank, index) => (
                <tr key={rank?._id}>
                  <td className=" border border-black text-center">{index + 1}</td>
                  <td className=" border border-black text-center">{rank?.rank}</td>
                  <td className=" border border-black text-center"> $ {parseFloat(rank?.amount).toFixed(2)}</td>
                 
                  <td className=" border border-black text-center">
                    {new Date(rank?.createdAt).toLocaleDateString()} {new Date(rank?.createdAt).toLocaleTimeString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center">
                  No rank income yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
    </div>
  )
}

export default RankIncomes