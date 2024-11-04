import React from 'react'

const InvesterRechargeHistory = () => {
  return (
    <div className='p-4 pt-20'>
        <h1 className='text-center text-2xl font-mono'>Generation Income</h1>
        <table className="min-w-full bg-white border mt-10">
  <thead>
    <tr>
      <th className=" border-2 border-black ">From</th>
      <th className=" border-2 border-black">Level</th>
      <th className=" border-2 border-black">Amount</th>
      <th className=" border-2 border-black">Date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className=" border border-black text-center">Ravi</td>
      <td className=" border border-black text-center">2</td>
      <td className=" border border-black text-center">$2</td>
      <td className=" border border-black text-center">2024-11-02</td>
    </tr>
  </tbody>
</table>
    </div>
  )
}

export default InvesterRechargeHistory