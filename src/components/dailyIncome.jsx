import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const DailyIncomes = () => {

  const { user } = useSelector((store) => store.auth);
  const [dailyIncomeHistory, setDailyIncomeHistory] = useState([]);

  const getDailyIncomeHistory = async () => {
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/invester/daily-history/${user?._id}`
      );
      console.log(res.data.data);
      setDailyIncomeHistory(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };


  useEffect(() => {
    getDailyIncomeHistory();
  }, []);

  return (
    <div className='p-4 pt-20 pb-28'>
        <h1 className='text-center text-2xl font-mono'>Daily Revenue Income</h1>
        <table className="min-w-full bg-white border mt-10">
          <thead>
            <tr>
              <th className=" border-2 border-black ">Sr No</th>
              <th className=" border-2 border-black ">Percentage</th>
              <th className=" border-2 border-black ">Amount</th>
              <th className=" border-2 border-black ">Date</th>
            </tr>
          </thead>  
          <tbody>
            {dailyIncomeHistory?.length > 0 ? (
              dailyIncomeHistory?.map((daily, index) => (
                <tr key={daily?._id}>
                  <td className=" border border-black text-center">{index + 1}</td>
                  <td className=" border border-black text-center">$ {daily?.balance}</td>
                  <td className=" border border-black text-center"> $ {parseFloat(daily?.amount).toFixed(2)}</td>
                 
                  <td className=" border border-black text-center">
                    {new Date(daily?.createdAt).toLocaleDateString()} {new Date(daily?.createdAt).toLocaleTimeString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center">
                  No income yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
    </div>
  )
}

export default DailyIncomes