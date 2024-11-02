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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xs">
        <h2 className="text-2xl font-bold mb-4 text-center">Recharge</h2>
        
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-4"
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
    </div>
  );
}

export default InvesterRecharge;
