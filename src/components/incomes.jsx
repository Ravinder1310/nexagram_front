import React from 'react';
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




  const incomeData = [
    { title: 'Daily Revenue Profit', amount: '2.040', link:"revenue-income" },
    { title: 'Referral Income', amount: '18.700', link:"referral-income" },
    { title: 'Generation Income', amount: '0.00', link:"generation-income" },
    { title: 'Royality Income', amount: '20.030', link:"royality-income" },
    { title: 'Rewards Profit', amount: '0.00', link:"rewards-income" }
  ];


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
