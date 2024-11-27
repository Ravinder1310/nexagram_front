import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { useSelector } from "react-redux";

function UsdtTest() {
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');
  const [status, setStatus] = useState('');
  const { user } = useSelector((store) => store.auth);
  const contractAddress = '0x13F3ff4C97E31008A2900cEBF228cBC7B07a01b2';
  const usdtAddress = '0x55d398326f99059fF775485246999027B3197955';

  const usdtAbi = [
    {
      constant: false,
      inputs: [
        { name: 'spender', type: 'address' },
        { name: 'amount', type: 'uint256' },
      ],
      name: 'approve',
      outputs: [{ name: '', type: 'bool' }],
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        { name: 'sender', type: 'address' },
        { name: 'recipient', type: 'address' },
        { name: 'amount', type: 'uint256' },
      ],
      name: 'transferFrom',
      outputs: [{ name: '', type: 'bool' }],
      type: 'function',
    },
    { constant: true, inputs: [], name: 'balanceOf', outputs: [{ name: '', type: 'uint256' }], type: 'function' },
  ];

  const handleConnectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        setStatus('Wallet connected');
      } else {
        setStatus('MetaMask not found. Please install MetaMask.');
      }
    } catch (error) {
      setStatus('Error connecting wallet');
    }
  };

  const handleTransfer = async () => {
    try {
      if (!window.ethereum) {
        setStatus('MetaMask not found. Please install MetaMask.');
        return;
      }

      // if (!amount || parseFloat(amount) < 25) {
      //   setStatus('Amount should be greater than $25');
      //   return;
      // }

      const web3 = new Web3(window.ethereum);
      const usdtContract = new web3.eth.Contract(usdtAbi, usdtAddress);

      // Approve the contract to spend the USDT
      const amountInWei = web3.utils.toWei(amount, 'ether');
      await usdtContract.methods.approve(contractAddress, amountInWei).send({ from: account });

      // Call sendUSDTToDeployer function on the contract
      const contractAbi = [
        {
          inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
          name: 'sendUSDTToDeployer',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ];
      const contract = new web3.eth.Contract(contractAbi, contractAddress);
      await contract.methods.sendUSDTToDeployer(amountInWei).send({ from: account });

      // setStatus('Transfer successful!');
      try{
        console.log("callet inside try ")
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/invester/recharge/${user._id}`,{amount})
        setStatus(res.data.message)
      }catch(err){
        setStatus("Some thing went wrong")
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };
  useEffect(()=>{handleConnectWallet()},[])

  return (
    <div className="flex flex-col shadow-lg shadow-gray-300 items-center justify-center py-6 border-2 rounded-md border-gray-300 bg-white">
      <h1 className="text-2xl font-bold mb-4">Invest To Earn</h1>

      <div
        
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {account ? `Connected: ${account.substring(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
      </div>

      <input
        type="number"
        placeholder="Enter USDT Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="mb-4 p-2 border rounded w-64"
      />

      <button
        onClick={handleTransfer}
        className="bg-gradient-to-r from-blue-400 to-[#0d355b]  hover:bg-green-400 text-white py-2 px-4 rounded"
      >
        Deposite Now
      </button>

      {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
    </div>
  );
}

export default UsdtTest;
