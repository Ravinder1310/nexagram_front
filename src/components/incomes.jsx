import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const IncomeCard = ({ title, amount, nav }) => {

  

  const navigate = useNavigate();

  return (
  <div className="bg-gradient-to-b from-orange-500 to-yellow-500 rounded-lg shadow-md p-4 flex flex-col items-center justify-between h-36 w-full">
    <div className="text-white font-bold text-md">{title}</div>
    <div className="text-black text-lg font-bold">$ {amount}</div>
    <button className="bg-teal-600 text-white py-1 px-3 mt-2 rounded-full text-xs shadow-md" onClick={() => {navigate(`/${nav}`)}}>
      Income
    </button>
  </div>
)
};

const Incomes = () => {
  const { user } = useSelector((store) => store.auth);
  // const [dailyIncomeHistory, setDailyIncomeHistory] = useState([]);
  const [dailyIncome, setDailyIncome] = useState(0);
  const [referralIncome, setReferralIncome] = useState(0);
  const [royalityIncome, setRoyalityIncome] = useState(0);
  const [generationIncome, setGenerationIncome] = useState(0);
  const [rewards, setRewards] = useState(0);

  const incomeData = [
    { title: 'Daily Revenue Profit', amount: dailyIncome, link:"revenue-income" },
    { title: 'Referral Income', amount: referralIncome, link:"referral-income" },
    { title: 'Generation Income', amount: generationIncome, link:"generation-income" },
    { title: 'Royality Income', amount: royalityIncome, link:"royality-income" },
    { title: 'Rewards Profit', amount: rewards, link:"rewards-income" }
  ];

  const getDailyIncomeHistory = async () => {
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/invester/daily-history/${user?._id}`
      );
      let totalDaily = 0;
      for(let i=0;i<res.data.data.length;i++){
          totalDaily += res.data.data[i].amount
      }
      setDailyIncome(totalDaily)
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDirectReerralIncomeHistory = async () => {
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/invester/direct-referral-income-history/${user?._id}`
      );
      let totalDaily = 0;
      for(let i=0;i<res.data.data.length;i++){
          totalDaily += res.data.data[i].amount
      }
      setReferralIncome(totalDaily)
    } catch (error) {
      console.log(error.message);
    }
  };


  const getRankIncomeHistory = async () => {
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/invester/rank-income-history/${user?._id}`
      );
      console.log(res.data.data);
      // setRankIncomeHistory(res.data.data);
      let totalDaily = 0;
      for(let i=0;i<res.data.data.length;i++){
          totalDaily += res.data.data[i].amount
      }
      setRoyalityIncome(totalDaily)
    } catch (error) {
      console.log(error.message);
    }
  };


  const getRewardIncomeHistory = async () => {
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/invester/reward-income-history/${user?._id}`
      );
      console.log(res.data.data);
      // setRewardIncomeHistory(res.data.data);
      let totalDaily = 0;
      for(let i=0;i<res.data.data.length;i++){
          totalDaily += res.data.data[i].amount
      }
      setRewards(totalDaily)
    } catch (error) {
      console.log(error.message);
    }
  };


  useEffect(() => {
    getDailyIncomeHistory();
    getDirectReerralIncomeHistory();
    getRankIncomeHistory()
    getRewardIncomeHistory
  }, []);


  return (
    <div className="max-w-md mx-auto p-4  rounded-xl shadow-lg text-center pt-20 pb-20">
      <h2 className="text-black text-lg font-serif mb-4">My All Income</h2>
      <div className="grid grid-cols-2 gap-4">
        {incomeData.map((income, index) => (
          <IncomeCard key={index} title={income.title} amount={income.amount} nav={income.link} />
        ))}
      </div>
    </div>
  );
};

export default Incomes;
