import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios'; // For API requests
import { toast } from 'sonner'; // Import toast from sonner
import { useNavigate } from 'react-router-dom';

function InfluencerPackages() {
  const { user } = useSelector((store) => store.auth);
  const userId = user?._id;
  const navigate = useNavigate();

  const packages = [
    {
      id: 'INPK50701', // Fixed string IDs
      name: 'Monthly Subscription',
      price: '$3',
      duration: '1 Month',
      likes: '0.0005 per Like',
      sharesComments: '0.001 per Share/Comment',
    },
    {
      id: 'INPK50702',
      name: '3-Month Subscription',
      price: '$7',
      duration: '3 Months',
      likes: '0.0005 per Like',
      sharesComments: '0.001 per Share/Comment',
    },
    {
      id: 'INPK50703',
      name: 'Yearly Subscription',
      price: '$25',
      duration: '12 Months',
      likes: '0.0005 per Like',
      sharesComments: '0.001 per Share/Comment',
    },
  ];

  // Function to handle package purchase
  const handlePurchase = async (packageId) => {
    if (!userId) {
      toast.error('You must be logged in to purchase a package.');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/package/purchase-package/${userId}`, {packageId},{ withCredentials: true});

      if (response.data.success) {
        toast.success('Package purchased successfully!');
      } else {
        toast.error(response.data.message);
        if(response.data.message === "Insufficient balance in the wallet"){
          navigate("/invester-recharge")
        }
      }
    } catch (error) {
      console.error('Error purchasing package:', error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center py-20 px-4 bg-white">
      <h1 className="text-3xl mb-8 text-gray-500 text-center font-mono ">
        Choose Your Influencer Package
      </h1>
                   
      <div className="grid grid-cols-1 w-[95%] sm:grid-cols-2 md:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {pkg.name}
            </h2>
            <p className="text-2xl font-bold text-green-500 mb-4">{pkg.price}</p>
            <p className="text-gray-600 mb-2"><span className='font-bold'>Subscription:</span> {pkg.duration}</p>
            <p className="text-gray-600 mb-2"><span className='font-bold'>Earn:</span> {pkg.likes}</p>
            <p className="text-gray-600 mb-4">{pkg.sharesComments}</p>
            <button
              onClick={() => handlePurchase(pkg.id)}
              className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
            >
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfluencerPackages;
