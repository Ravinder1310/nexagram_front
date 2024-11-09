import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const RewardIncomes = () => {

  const { user } = useSelector((store) => store.auth);
  const [rewardIncomeHistory, setRewardIncomeHistory] = useState([]);

  const getRewardIncomeHistory = async () => {
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/invester/reward-income-history/${user?._id}`
      );
      console.log(res.data.data);
      setRewardIncomeHistory(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };


  useEffect(() => {
    getRewardIncomeHistory();
  }, []);

  return (
    <div className='p-4 pt-20 pb-28'>
        <h1 className='text-center text-2xl font-mono'>Rewards Income</h1>
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
            {rewardIncomeHistory?.length > 0 ? (
              rewardIncomeHistory?.map((reward, index) => (
                <tr key={reward?._id}>
                  <td className=" border border-black text-center">{index + 1}</td>
                  <td className=" border border-black text-center">{reward?.rank}</td>
                  <td className=" border border-black text-center"> $ {parseFloat(reward?.amount).toFixed(2)}</td>
                 
                  <td className=" border border-black text-center">
                    {new Date(reward?.createdAt).toLocaleDateString()} {new Date(reward?.createdAt).toLocaleTimeString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center">
                  No reward yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
    </div>
  )
}

export default RewardIncomes