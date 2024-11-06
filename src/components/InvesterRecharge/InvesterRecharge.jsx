import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_usdtTokenAddress",
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
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "BullPurchased",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "purchaseBull",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
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
]

// Addresses
const contractAddress = '0x8b122cd3B74b06664C1fFAa674D020Cc49092F67'; // Your contract address
const usdtAddress = '0x55d398326f99059fF775485246999027B3197955'; // USDT address on BSC

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
                provider = new ethers.providers.Web3Provider(window.ethereum, 'any'); // Handle all wallets
                await window.ethereum.request({ method: 'eth_requestAccounts' }); // Prompt user to connect account
            } else if (window.web3) {
                provider = new ethers.providers.Web3Provider(window.web3.currentProvider, 'any');
            } else {
                toast.error('Please install MetaMask or Trust Wallet to use this feature.');
                setLoading(false);
                return;
            }

            const signer = provider.getSigner();
            const userAddress = await signer.getAddress();
            console.log('User Wallet Address:', userAddress);

            // Ensure that the wallet is connected to Binance Smart Chain
            const { chainId } = await provider.getNetwork();
            if (chainId !== 56) { // BSC Mainnet has chainId of 56
                toast.error('Please switch your wallet to Binance Smart Chain (BSC).');
                setLoading(false);
                return;
            }

            // Interact with USDT contract for approval
            const usdtContract = new ethers.Contract(
                usdtAddress,
                ['function approve(address spender, uint256 amount) public returns (bool)'],
                signer
            );

            const approveAmount = ethers.utils.parseUnits(amount.toString(), 18); // Convert to 18 decimals
            const approvalTransaction = await usdtContract.approve(contractAddress, approveAmount);
            await approvalTransaction.wait();

            // Interact with your Bull Plan contract to purchase Bull
            const bullContract = new ethers.Contract(contractAddress, contractABI, signer);
            const purchaseTransaction = await bullContract.purchaseBull(approveAmount);
             const rest=await purchaseTransaction.wait();
 console.log("contract response ====================>",rest);
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

export default InvesterRecharge
