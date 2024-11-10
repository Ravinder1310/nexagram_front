import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const GenerationIncomes = () => {

  const { user } = useSelector((store) => store.auth);
  const [generationIncomeHistory, setGenerationIncomeHistory] = useState([]);

  const getGenerationIncomeHistory = async () => {
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/invester/generation-income-history/${user?._id}`
      );
      console.log(res.data.data);
      setGenerationIncomeHistory(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };


  useEffect(() => {
    getGenerationIncomeHistory();
  }, []);

  return (
    <div className='p-4 pt-20 pb-28'>
        <h1 className='text-center text-2xl font-mono'>Generation Income</h1>
        <table className="min-w-full bg-white border mt-10">
  <thead>
    <tr>
    {/* <th className=" border-2 border-black ">Sr.</th> */}
      <th className=" border-2 border-black ">From</th>
      <th className=" border-2 border-black">Level</th>
      <th className=" border-2 border-black">Amount</th>
      <th className=" border-2 border-black">Date</th>
    </tr>
  </thead>
  <tbody>
  {generationIncomeHistory?.length > 0 ? (
              generationIncomeHistory?.map((generation, index) => (
                <tr key={generation?._id}>
                  {/* <td className=" border border-black text-center">{index + 1}</td> */}
                  <td className=" border border-black text-center">{generation?.from}</td>
                  <td className=" border border-black text-center">{generation?.level}</td>
                  <td className=" border border-black text-center"> $ {parseFloat(generation?.amount).toFixed(2)}</td>
                 
                  <td className=" border border-black text-center">
                    {new Date(generation?.createdAt).toLocaleDateString()} {new Date(generation?.createdAt).toLocaleTimeString()}
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

export default GenerationIncomes