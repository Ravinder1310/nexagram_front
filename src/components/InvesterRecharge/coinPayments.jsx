import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/v1/coin-payments';

export const createDeposit = async ( amount, currency, memberId) => {
 console.log(memberId);
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/coin-payments/deposit`, {
      member_id:memberId,
      amount,
      currency,
    });
    return response.data;
  } catch (error) {
    console.error('Deposit Creation Error:', error);
    throw error;
  }
};


export const getTransactions = async (memberId) => {
  const member_id = memberId;
  console.log(member_id);
  
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/coin-payments/transactions/${member_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};