import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

function InvesterRecharge() {
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { user } = useSelector((store) => store.auth);
    const [rechargeHistory, setRechargeHistory] = useState([]);

    const handleRecharge = async () => {
        if (!amount || isNaN(amount) || amount <= 0) {
            setMessage('Please enter a valid amount.');
            return;
        }
    
        setLoading(true);
        setMessage('');
    
        try {
            const res = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/v1/invester/recharge/${user?._id}`, {
                    amount
                }
            );

            // Display the response message in the `message` state and as a toast
            setMessage(res.data.message);
            if (res.status === 200) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }

        } catch (error) {
            console.error('Transaction Error:', error);

            // Handle error and display a message to the user
            setMessage(error.response?.data?.message || 'An error occurred while processing your request.');
            toast.error(error.response?.data?.message || 'An error occurred while processing your request.');
        } finally {
            setLoading(false);
        }
    };
    
    const getRechargeHistory = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/invester/recharge-history/${user?._id}`
            );
            setRechargeHistory(res.data.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getRechargeHistory();
    }, []);

    return (
        <div className="pt-20 bg-gray-100 px-4 pb-28">
            <h2 className="font-mono text-3xl mt-10 text-center text-gray-500">Start the journey!</h2>
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
            <div className="mt-10">
                <h1 className="text-center text-xl font-serif mt-20 mb-6">Recharge History</h1>
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 border-b">Sr No</th>
                            <th className="py-2 border-b">Amount</th>
                            <th className="py-2 border-b">Date</th>
                            <th className="py-2 border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rechargeHistory?.length > 0 ? (
                            rechargeHistory.map((recharge, index) => (
                                <tr key={recharge._id}>
                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                    <td className="py-2 px-4 border-b">${recharge.amount}</td>
                                    <td className="py-2 px-4 border-b">
                                        {new Date(recharge.createdAt).toLocaleDateString()} {new Date(recharge.createdAt).toLocaleTimeString()}
                                    </td>
                                    <td className="py-2 px-4 border-b">{recharge.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-4 text-center">No recharge yet</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default InvesterRecharge;
