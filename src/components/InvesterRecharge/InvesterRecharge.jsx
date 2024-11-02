import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'

function InvesterRecharge() {
  const [amount, setAmount] =  useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useSelector(store => store.auth);


  const handleRecharge = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setMessage('Please enter a valid amount.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/invester/recharge/${user?._id}`, { amount });
      if (response.data.success) {
        setMessage('Recharge successful!');
        setAmount(0)
      } else {
        setMessage('Recharge failed. Please try again.');
      }
    } catch (error) {
      console.log(error)
      setMessage('Error processing recharge.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 bg-gray-100 px-4 pb-28">
      <h2 className='font-mono text-3xl mt-10 text-center text-gray-500'>Start the journey!</h2>
      <div className="bg-white p-8 m-auto mt-24 rounded-lg shadow-lg w-[90%] max-w-xs">
        <h2 className="text-2xl font-bold mb-4 text-center">Recharge</h2> 
        
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-4 text-center"
        />

        <button
          onClick={handleRecharge}
          disabled={loading}
          className={`w-full py-2 rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white font-bold`}
        >
          {loading ? 'Processing...' : 'Recharge'}
        </button>

        {message && (
          <div className="mt-4 text-center text-sm text-gray-700">
            {message}
          </div>
        )}
      </div>
      <div className='mt-10'>
        <h1 className='text-center text-xl font-serif mt-20 mb-6'> Recharge History</h1>
      <table className="min-w-full bg-white border">
  <thead>
    <tr>
      <th className="py-2 border-b">Sr No</th>
      <th className="py-2 border-b">Amount</th>
      <th className="py-2  border-b">Date</th>
      <th className="py-2  border-b">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="py-2 px-4 border-b">1</td>
      <td className="py-2 px-4 border-b">$10</td>
      <td className="py-2 px-4 border-b">2024-11-02 12:34 PM</td>
      <td className="py-2 px-4 border-b">Success</td>
    </tr>
    <tr>
      <td className="py-2 px-4 border-b">2</td>
      <td className="py-2 px-4 border-b">$25</td>
      <td className="py-2 px-4 border-b">2024-11-02 01:15 PM</td>
      <td className="py-2 px-4 border-b">Success</td>
    </tr>
    <tr>
      <td className="py-2 px-4 border-b">3</td>
      <td className="py-2 px-4 border-b">$50</td>
      <td className="py-2 px-4 border-b">2024-11-02 02:45 PM</td>
      <td className="py-2 px-4 border-b">Success</td>
    </tr>
  </tbody>
</table>

      </div>
    </div>
  );
}

export default InvesterRecharge;
