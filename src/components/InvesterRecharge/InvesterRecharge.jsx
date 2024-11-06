import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "recharge",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_usdtToken",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "Recharge",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "usdtToken",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// Addresses
const contractAddress = '0xD82Cd01385F8402A4BDBFB51CDc6682A6eCb11B4'; // Contract address on BSC Testnet
const usdtAddress = '0x55d398326f99059fF775485246999027B3197955'; // USDT address on BSC Testnet

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
            // Check for the Web3 provider (MetaMask or Trust Wallet)
            let provider;
            if (window.ethereum) {
                provider = new ethers.providers.Web3Provider(window.ethereum);
            } else if (window.web3) {
                provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
            } else {
                throw new Error("No web3 provider found. Please install MetaMask or Trust Wallet.");
            }

            await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();

            // Check if on Binance Smart Chain Testnet
            const { chainId } = await provider.getNetwork();
            if (chainId !== 97) {
                toast.error('Please switch to Binance Smart Chain Testnet (BSC Testnet).');
                setLoading(false);
                return;
            }

            // Parse the amount to the correct format
            const parsedAmount = ethers.utils.parseUnits(amount.toString(), 18);

            // Approve the contract to spend USDT
            const usdtContract = new ethers.Contract(usdtAddress, [
                'function approve(address spender, uint256 amount) public returns (bool)'
            ], signer);

            const approvalTxn = await usdtContract.approve(contractAddress, parsedAmount);
            await approvalTxn.wait(); // Wait for the approval transaction to confirm

            // Call the recharge function on the contract
            const rechargeContract = new ethers.Contract(contractAddress, contractABI, signer);
            const rechargeTxn = await rechargeContract.recharge(parsedAmount);
            await rechargeTxn.wait(); // Wait for the recharge transaction to confirm

            toast.success('Recharge successful!');
            setAmount(0);
            getRechargeHistory();

            // Record recharge in the backend
            const { data } = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/v1/invester/recharge/${user?._id}`,
                { amount }
            );
            if (data.success) {
                toast.success('Recharge recorded successfully!');
            } else {
                toast.error('Failed to record recharge.');
            }

        } catch (error) {
            console.error('Transaction Error:', error);
            toast.error('An error occurred while processing your request.');
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
