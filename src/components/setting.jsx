import React from "react";
import meta from "./images/meta.png";
import avatar from "./images/avatar.png";

const Setting = () => {
  return (
    <div className="pt-20">
      <h1 className="text-center font-serif text-2xl">Main Menu</h1>
      <div className="flex justify-between px-6 mt-4 items-center">
        <h1 className="text-gray-500 font-bold">Your Account</h1>
        <img src={meta} className="w-14 h-5" />
      </div>
      <div className="flex items-center justify-between mt-4 p-4 bg-white hover:bg-gray-100 cursor-pointer border-b">
        <div className="flex items-center">
            {/* Profile Icon */}
            <img src={avatar} className="w-10 rounded-full"/>
          <div className="ml-4 text-left">
            <p className="font-semibold text-black text-left">Accounts Centre</p>
            <p className="text-sm text-gray-500 text-left">
              Details, referral, personal details, ad preferences
            </p>
          </div>
        </div>
        {/* Arrow Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
      <div className="bg-white p-4">
  <p className="text-gray-500 font-medium mb-4 text-left">How you use DazzleDen</p>
  
  {/* Saved */}
  <div className="flex justify-between items-center py-2 hover:bg-gray-100 cursor-pointer">
    <div className="flex items-center gap-4">
      {/* Saved Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-gray-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.25 3v19.5l6.75-4.5 6.75 4.5V3A2.25 2.25 0 0016.5 0H7.5A2.25 2.25 0 005.25 3z"
        />
      </svg>
      <p className="text-black">Dashboard</p>
    </div>
    {/* Arrow Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 text-gray-500"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  </div>

  {/* Archive */}
  <div className="flex justify-between items-center py-2 hover:bg-gray-100 cursor-pointer">
    <div className="flex items-center gap-4">
      {/* Archive Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-gray-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 7.5h18v9a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 16.5v-9zM21 4.5v3H3v-3a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 4.5z"
        />
      </svg>
      <p className="text-black">Invest</p>
    </div>
    {/* Arrow Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 text-gray-500"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  </div>

  {/* Your activity */}
  <div className="flex justify-between items-center py-2 hover:bg-gray-100 cursor-pointer">
    <div className="flex items-center gap-4">
      {/* Activity Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-gray-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3v18h18V3H3zm6.75 15.75L9 18.375 3 12.375l1.75-1.75 4.25 4.25 10-10L21 6.375l-11.25 11.25z"
        />
      </svg>
      <p className="text-black">Team</p>
    </div>
    {/* Arrow Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 text-gray-500"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  </div>

  {/* Notifications */}
  <div className="flex justify-between items-center py-2 hover:bg-gray-100 cursor-pointer">
    <div className="flex items-center gap-4">
      {/* Notifications Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-gray-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10V8.25a6.75 6.75 0 10-9.964 6.087L5.25 15V10.5m7.5-3v5.25H6.75"
        />
      </svg>
      <p className="text-black">All Incomes</p>
    </div>
    {/* Arrow Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 text-gray-500"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  </div>

  {/* Time management */}
  <div className="flex justify-between items-center py-2 hover:bg-gray-100 cursor-pointer">
    <div className="flex items-center gap-4">
      {/* Time Management Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-gray-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6.75H7.5v1.5H12c1.1046 0 2 .8954 2 2s-.8954 2-2 2-2-.8954-2-2H7.5c0 2.4853 2.0147 4.5 4.5 4.5s4.5-2.0147 4.5-4.5S15.9853 12 12 12z"
        />
      </svg>
      <p className="text-black">Withdrawl</p>
    </div>
    {/* Arrow Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 text-gray-500"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  </div>

  {/* Help Desk */}
  <div className="flex justify-between items-center py-2 hover:bg-gray-100 cursor-pointer">
    <div className="flex items-center gap-4">
      {/* Time Management Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-gray-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6.75H7.5v1.5H12c1.1046 0 2 .8954 2 2s-.8954 2-2 2-2-.8954-2-2H7.5c0 2.4853 2.0147 4.5 4.5 4.5s4.5-2.0147 4.5-4.5S15.9853 12 12 12z"
        />
      </svg>
      <p className="text-black">Help Desk</p>
    </div>
    {/* Arrow Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 text-gray-500"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  </div>

  {/* Presentation */}
  <div className="flex justify-between items-center py-2 hover:bg-gray-100 cursor-pointer">
    <div className="flex items-center gap-4">
      {/* Time Management Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-gray-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6.75H7.5v1.5H12c1.1046 0 2 .8954 2 2s-.8954 2-2 2-2-.8954-2-2H7.5c0 2.4853 2.0147 4.5 4.5 4.5s4.5-2.0147 4.5-4.5S15.9853 12 12 12z"
        />
      </svg>
      <p className="text-black">Presentation</p>
    </div>
    {/* Arrow Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 text-gray-500"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  </div>

   {/* Logout */}
   <div className="flex justify-between items-center py-2 hover:bg-gray-100 cursor-pointer">
    <div className="flex items-center gap-4">
      {/* Time Management Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-gray-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6.75H7.5v1.5H12c1.1046 0 2 .8954 2 2s-.8954 2-2 2-2-.8954-2-2H7.5c0 2.4853 2.0147 4.5 4.5 4.5s4.5-2.0147 4.5-4.5S15.9853 12 12 12z"
        />
      </svg>
      <p className="text-black">Logout</p>
    </div>
    {/* Arrow Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 text-gray-500"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  </div>
</div>

    </div>
  );
};

export default Setting;
