import axios from 'axios';
import React, { useState } from 'react'

function Withdrawl({user}) {
    const [withdrawlAmount, setWithdrawlAmount] = useState(0);
    const [withdrawlLoading, setWithdrawlLoading] = useState(false);

    const incomeWithdrawl = async () => {
        try {
          setWithdrawlLoading(true);
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/v1/invester/withdrawl/${
              user?._id
            }/${withdrawlAmount}`,
            { withCredentials: true }
          );
          if (res.data.success) {
            // toast.success(res.data.message);
            // console.log(res.data.data);
            
            setWithdrawlLoading(false);
            setWithdrawlAmount(0);
            setIsOpenWithdrawl(true)
            dispatch(setAuthUser(res.data.data));
          }
        } catch (error) {
          console.log(error);
          setWithdrawlLoading(false)
            toast.error(error.message);
        }
      };

  return (
    <div>
      <div
        className="mt-8 shadow-lg shadow-gray-300 p-4 py-6 border-2 rounded-lg border-gray-200"
        style={{
          backgroundImage: "url('/images/social.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "200px", // Set an appropriate height
        }}
      >
        <h1 className="text-center text-2xl font-serif">
          Withdraw Your Income
        </h1>
        <div>
          <h1 className="text-center mt-2 font-semibold">
            Balance Wallet : $ {parseFloat(user?.earningWallet).toFixed(2) || 0}
          </h1>
        </div>
        <div className="mt-6 text-center">
          <input
            className="w-[100%] border-2 rounded-md text-center border-gray-200 p-1"
            type="number"
            value={withdrawlAmount}
            placeholder="Enter Amount"
            onChange={(e) => {setWithdrawlAmount(e.target.value)}}
          />
          <button className="bg-gradient-to-r from-blue-400 to-[#0d355b] mt-6 p-2 px-2 rounded-md text-md text-white" onClick={incomeWithdrawl}>
            {
              withdrawlLoading ? "Processing" : "Claim Withdrawal ↗"
            }
            
          </button>
        </div>
      </div>
    </div>
  )
}

export default Withdrawl
