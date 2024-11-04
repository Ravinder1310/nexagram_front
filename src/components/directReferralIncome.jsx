import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const DirectReferralIncomes = () => {

  const { user } = useSelector((store) => store.auth);
  const [directReerralIncomeHistory, setDirectReerralIncomeHistory] = useState([]);

  const getDirectReerralIncomeHistory = async () => {
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/invester/direct-referral-income-history/${user?._id}`
      );
      console.log(res.data.data);
      setDirectReerralIncomeHistory(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };


  useEffect(() => {
    getDirectReerralIncomeHistory();
  }, []);

  return (
    <div className='p-4 pt-20'>
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
            {directReerralIncomeHistory?.length > 0 ? (
              directReerralIncomeHistory?.map((direct, index) => (
                <tr key={daily?._id}>
                  <td className=" border border-black text-center">{index + 1}</td>
                  <td className=" border border-black text-center">$ {direct?.balance}</td>
                  <td className=" border border-black text-center"> $ {parseFloat(direct?.amount).toFixed(2)}</td>
                 
                  <td className=" border border-black text-center">
                    {new Date(direct?.createdAt).toLocaleDateString()} {new Date(direct?.createdAt).toLocaleTimeString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center">
                  No direct income yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
    </div>
  )
}

export default DirectReferralIncomes