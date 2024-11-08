import React from 'react';

const Marquee = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap mt-12 bg-[#0d355b] text-white h-10 flex items-center">
      <div className="inline-block animate-marquee">
        <p className="text-lg font-bold text-white">
          Pay your pending bills | Mobile Recharge | DTH Recharge | Electric Bill | Gas Recharge | Piped Gas Bill | Water Bill | Loan & EMI.
        </p>
      </div>
    </div>
  );
};

export default Marquee;
