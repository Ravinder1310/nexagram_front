import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrain,
    faTicketAlt,
    faBus,
    faGlobe,
    faTaxi,
    faSubway,
    faRoute, 
  faThLarge
} from "@fortawesome/free-solid-svg-icons"; // Import necessary icons
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import comingSoon from "./images/coming.gif"

const Travels = () => {

    const [isOpen, setIsOpen] = useState(false); // Using useState to manage dialog state

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

  return (
    <div className={"m-auto rounded-xl mt-10 py-6 px-2 bg-white shadow-xl text-[#0d355b] w-[95%]"}>
      <h1 className="text-left font-bold mb-4 ml-4">Travel & Bookings</h1>
      <div className="flex flex-wrap justify-between gap-x-4 gap-y-1">

        {/* Aadhaar Card */}
        <div className="w-[20%] flex flex-col items-center justify-center h-[160px]" onClick={onOpen}>
          <div className="rounded-full shadow-xl shadow-slate-300 p-4 flex justify-center items-center">
            <FontAwesomeIcon icon={faTrain} size="1x" className="text-2xl" />
          </div>
          <h4 className="mt-3 text-md font-semibold text-center h-16">IRCTC</h4>
        </div>

        {/* PAN Card */}
        <div className="w-[20%] flex flex-col items-center justify-center h-[160px]" onClick={onOpen}>
          <div className="rounded-full shadow-xl shadow-slate-300 p-4 flex justify-center items-center">
            <FontAwesomeIcon icon={faTicketAlt} size="1x" className="text-2xl" />
          </div>
          <h4 className="mt-3 text-md font-semibold text-center h-16">Confirm Tkt</h4>
        </div>

        {/* Income Tax */}
        <div className="w-[20%] flex flex-col items-center justify-center h-[160px]" onClick={onOpen}>
          <div className="rounded-full shadow-xl shadow-slate-300 p-4 flex justify-center items-center">
            <FontAwesomeIcon icon={faBus} size="1x" className="text-2xl" />
          </div>
          <h4 className="mt-3 text-md font-semibold text-center h-16">Bus Tkt</h4>
        </div>

        {/* E-Card */}
        <div className="w-[20%] flex flex-col items-center justify-center h-[160px]" onClick={onOpen}>
          <div className="rounded-full shadow-xl shadow-slate-300 p-4 flex justify-center items-center">
            <FontAwesomeIcon icon={faGlobe} size="1x" className="text-2xl" />
          </div>
          <h4 className="mt-3 text-md font-semibold text-center h-16">My Trip</h4>
        </div>

        {/* Voter Card */}
        <div className="w-[20%] flex flex-col items-center justify-center h-[160px]" onClick={onOpen}>
          <div className="rounded-full shadow-xl shadow-slate-300 p-4 flex justify-center items-center">
            <FontAwesomeIcon icon={faTaxi} size="1x" className="text-2xl" />
          </div>
          <h4 className="mt-3 text-md font-semibold text-center h-16">OLA</h4>
        </div>

        {/* Passport */}
        <div className="w-[20%] flex flex-col items-center justify-center h-[160px]" onClick={onOpen}>
          <div className="rounded-full shadow-xl shadow-slate-300 p-4 flex justify-center items-center">
            <FontAwesomeIcon icon={faSubway} size="1x" className="text-2xl" />
          </div>
          <h4 className="text-md mt-2 font-semibold text-center h-16">Sport Train</h4>
        </div>

        {/* Post Office */}
        <div className="w-[20%] flex flex-col items-center justify-center h-[160px]" onClick={onOpen}>
          <div className="rounded-full shadow-xl shadow-slate-300 p-4 flex justify-center items-center">
            <FontAwesomeIcon icon={faRoute} size="1x" className="text-2xl" />
          </div>
          <h4 className="mt-3 text-md font-semibold text-center h-16">Parivahan</h4>
        </div>

        {/* More Options */}
        <div className="w-[20%] flex flex-col items-center justify-center h-[160px]" onClick={onOpen}>
          <div className="rounded-full shadow-xl shadow-slate-300 p-4 flex justify-center items-center">
            <FontAwesomeIcon icon={faThLarge} size="1x" className="text-2xl" />
          </div>
          <h4 className="mt-3 text-md font-semibold text-center h-16">More Options</h4>
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
  );
};

export default Travels;
