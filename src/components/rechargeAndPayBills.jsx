import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileAlt,
  faWater,
  faGasPump,
  faLightbulb,
  faTv,
  faMoneyCheckAlt,
  faMoneyCheck,
  faThLarge
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import comingSoon from "./images/coming.gif"

const RechargeAndBill = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Using useState to manage dialog state

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <div className={`m-auto rounded-xl mt-10 py-6 px-2 bg-white shadow-xl text-[#0d355b] w-[95%]`}>
      <h1 className="text-left font-bold mb-4 ml-4">Recharge & Bills</h1>

      <div className="flex flex-wrap justify-between gap-x-4 gap-y-1">
        {/* Mobile Recharge */}
        <div className="w-[20%] flex flex-col items-center justify-center h-[160px]" onClick={() => { navigate("/mobile-recharge") }}>
          <div className="rounded-full shadow-xl shadow-slate-300 p-4 flex justify-center items-center">
            <FontAwesomeIcon icon={faMobileAlt} size="1x" className="text-2xl" />
          </div>
          <h4 className="mt-3 text-md font-semibold text-center h-16">Mobile Recharge</h4>
        </div>

        {/* DTH Recharge */}
        <div className="w-[20%] flex flex-col items-center justify-center h-[160px]" onClick={onOpen}>
          <div className="rounded-full shadow-xl shadow-slate-300 p-4 flex justify-center items-center">
            <FontAwesomeIcon icon={faTv} size="1x" className="text-2xl" />
          </div>
          <h4 className="mt-3 text-md font-semibold text-center h-16">DTH Recharge</h4>
        </div>

        {/* Water Bill */}
        <div className="w-[20%] flex flex-col items-center justify-center h-[160px]" onClick={onOpen}>
          <div className="rounded-full shadow-xl shadow-slate-300 p-4 flex justify-center items-center">
            <FontAwesomeIcon icon={faWater} size="1x" className="text-2xl" />
          </div>
          <h4 className="mt-3 text-md font-semibold text-center h-16">Water Bill</h4>
        </div>

        {/* Gas Bill */}
        <div className="w-[20%] flex flex-col items-center justify-center h-[160px]" onClick={onOpen}>
          <div className="rounded-full shadow-xl shadow-slate-300 p-4 flex justify-center items-center">
            <FontAwesomeIcon icon={faGasPump} size="1x" className="text-2xl" />
          </div>
          <h4 className="mt-3 text-md font-semibold text-center h-16">Gas Bill</h4>
        </div>

        {/* Electricity Bill */}
        <div className="w-[20%] flex flex-col items-center justify-center h-[160px]" onClick={onOpen}>
          <div className="rounded-full shadow-xl shadow-slate-300 p-4 flex justify-center items-center">
            <FontAwesomeIcon icon={faLightbulb} size="1x" className="text-2xl" />
          </div>
          <h4 className="mt-3 text-md font-semibold text-center h-16">Electricity Bill</h4>
        </div>

        {/* Fastag Recharge */}
        <div className="w-[20%] flex flex-col items-center justify-center h-[160px]" onClick={onOpen}>
          <div className="rounded-full shadow-xl shadow-slate-300 p-4 flex justify-center items-center">
            <FontAwesomeIcon icon={faMoneyCheckAlt} size="1x" className="text-2xl" />
          </div>
          <h4 className="text-md mt-2 font-semibold text-center h-16">Fastag Recharge</h4>
        </div>

        {/* Loan & EMI */}
        <div className="w-[20%] flex flex-col items-center justify-center h-[160px]" onClick={onOpen}>
          <div className="rounded-full shadow-xl shadow-slate-300 p-4 flex justify-center items-center">
            <FontAwesomeIcon icon={faMoneyCheck} size="1x" className="text-2xl" />
          </div>
          <h4 className="mt-3 text-md font-semibold text-center h-16">Loan & EMI</h4>
        </div>

        {/* More Options */}
        <div className="w-[20%] flex flex-col items-center justify-center h-[160px]" onClick={onOpen}>
          <div className="rounded-full shadow-xl shadow-slate-300 p-4 flex justify-center items-center">
            <FontAwesomeIcon icon={faThLarge} size="1x" className="text-2xl" />
          </div>
          <h4 className="mt-3 text-md font-semibold text-center h-16">More Options</h4>
        </div>
      </div>

      {/* Coming Soon Modal */}
      <Dialog open={isOpen} onOpenChange={onClose}>
          {/* <DialogTrigger>
            <button onClick={onOpen}>Open Dialog</button> 
          </DialogTrigger> */}
          <DialogContent className="bg-transparent border-none">
            <div className="max-w-[100%] rounded-lg shadow-2xl bg-yellow-400 text-black p-6">
              <button
                onClick={onClose}
                className="absolute top-8 p-2 py-1 right-8 text-lg rounded-lg text-white bg-black font-bold"
              >
                &times; {/* Close button */}
              </button>
              <div className="text-center">
                <img
                  src={comingSoon}
                  alt="Coming Soon"
                  className="w-[100%] mx-auto"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>


    </div>
  );
};

export default RechargeAndBill;
