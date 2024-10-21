import React from 'react';

const IncomeCard = ({ title, amount }) => (
  <div className="bg-gradient-to-b from-gray-800 to-black rounded-lg shadow-md p-4 flex flex-col items-center justify-between h-32 w-full">
    <div className="text-white text-sm">{title}</div>
    <div className="text-teal-400 text-lg font-bold">Rs. {amount}</div>
    <button className="bg-teal-600 text-white py-1 px-3 mt-2 rounded-full text-xs shadow-md">
      Income
    </button>
  </div>
);

const Incomes = () => {
  const incomeData = [
    { title: 'Daily Bot Profit', amount: '2.040' },
    { title: 'Referral Income', amount: '32.200' },
    { title: 'Matching Income', amount: '18.700' },
    { title: 'Booster Income', amount: '0.00' },
    { title: 'Direct Club Bonus', amount: '20.030' },
    { title: 'Progress Rank Bonus', amount: '0.00' },
    { title: 'Monthly CTO Bonus', amount: '0.00' },
    { title: 'Rewards Income', amount: '0.00' },
  ];

  return (
    <div className="max-w-md mx-auto p-4 bg-gradient-to-b from-gray-900 to-black rounded-xl shadow-lg text-center pt-20 pb-20">
      <h2 className="text-white text-lg font-bold mb-4">My All Income</h2>
      <div className="grid grid-cols-2 gap-4">
        {incomeData.map((income, index) => (
          <IncomeCard key={index} title={income.title} amount={income.amount} />
        ))}
      </div>
    </div>
  );
};

export default Incomes;
