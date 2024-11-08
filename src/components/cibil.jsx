import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//  faCcVisa, faCcAmex, faCcJcb
// } from "@fortawesome/free-brands-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast"; // Import Toaster
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import comingSoon from "./images/coming.gif"
import sbi from "./images/sbi.png"
import hdfc from "./images/hdfc.png"
import icici from "./images/icici.png"

const CibilScore = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false); // Using useState to manage dialog state

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

  const handleToast = () => {
    toast("Sorry for the inconvenience but currently We are working on this", {
      duration: 4000,
      position: "top-center",
      style: {
        background: "yellow",
        color: "black",
        fontWeight: 600,
      },
      icon: `😞`,
    });
  };

  return (
    <div className={"m-auto rounded-xl mt-10 py-6 px-2 bg-white shadow-xl text-[#0d355b] w-[95%]"}>
    <h1 className="text-left font-bold mb-4 ml-4">Cibil Score/ Credit Card/ Loan</h1>
    <div className="flex flex-wrap justify-between gap-x-4 gap-y-1">

      {/* Aadhaar Card */}
      <div className="w-[20%] flex flex-col items-center justify-center h-[160px]" onClick={onOpen}>
        <div className="rounded-full shadow-xl shadow-slate-300 p-4 flex justify-center items-center">
          <FontAwesomeIcon icon={faCreditCard} size="1x" className="text-2xl" />
        </div>
        <h4 className="mt-3 text-md font-semibold text-center h-16">Check Cibil Score</h4>
      </div>

      {/* PAN Card */}
      <div className="w-[20%] flex flex-col items-center justify-center h-[160px]" onClick={onOpen}>
        <div className="rounded-full shadow-xl shadow-slate-300 p-4 flex justify-center items-center">
          {/* <FontAwesomeIcon icon={faTicketAlt} size="1x" className="text-2xl" /> */}
          <img src={sbi} width={'40px'}/>
        </div>
        <h4 className="mt-3 text-md font-semibold text-center h-16">SPI Credit Card</h4>
      </div>

      {/* Income Tax */}
      <div className="w-[20%] flex flex-col items-center justify-center h-[160px]" onClick={onOpen}>
        <div className="rounded-full shadow-xl shadow-slate-300 p-4 flex justify-center items-center">
        <img src={icici} width={'40px'}/>

        </div>
        <h4 className="mt-3 text-md font-semibold text-center h-16">ICICI Credit Card</h4>
      </div>

      {/* E-Card */}
      <div className="w-[20%] flex flex-col items-center justify-center h-[160px]" onClick={onOpen}>
        <div className="rounded-full shadow-xl shadow-slate-300 p-4 flex justify-center items-center">
        <img src={hdfc} width={'40px'}/>

        </div>
        <h4 className="mt-3 text-md font-semibold text-center h-16">HDFC Credit Card</h4>
      </div>
      
    </div>
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
  )
}

export default CibilScore