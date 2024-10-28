import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiOutlineDollarCircle, AiOutlineBarChart, AiOutlineCustomerService } from 'react-icons/ai'; // Import icons

function BenefitsPackage() {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate('/influencer-packages');
  };

  return (
    <div className="bg-gray-100 py-20 ">
      <div className="max-w-4xl mx-auto text-center bg-white shadow-md rounded-lg p-10">
        <h1 className="text-xl font-bold text-gray-800 mb-6">
          Why Choose Our Influencer Packages?
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Our packages are designed to help you grow your influence, increase engagement, and get rewarded for your social media activity.
        </p>
        <div className="text-left space-y-8">
          {/* Benefit 1 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2 flex items-center">
              <AiOutlineHeart className="text-blue-600 text-4xl mr-2" /> Maximize Your Engagement
            </h2>
            <p className="text-gray-600 text-lg">
              Upload your reels and content to reach a wider audience. Our packages ensure that your content gets the exposure it deserves, increasing likes, shares, and comments.
            </p>
          </div>
          {/* Benefit 2 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2 flex items-center">
              <AiOutlineDollarCircle className="text-blue-600 text-4xl mr-2" /> Earn More from Your Content
            </h2>
            <p className="text-gray-600 text-lg">
              For every like, share, and comment your posts receive, you'll earn rewards. Turn your social media activity into a steady stream of passive income.
            </p>
          </div>
          {/* Benefit 3 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2 flex items-center">
              <AiOutlineBarChart className="text-blue-600 text-4xl mr-2" /> Monthly Analytics and Insights
            </h2>
            <p className="text-gray-600 text-lg">
              Gain access to detailed analytics that help you understand your audience better, allowing you to fine-tune your strategy for maximum impact.
            </p>
          </div>
          {/* Benefit 4 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2 flex items-center">
              <AiOutlineCustomerService className="text-blue-600 text-4xl mr-2" /> Priority Support and Assistance
            </h2>
            <p className="text-gray-600 text-lg">
              Get priority access to our dedicated support team, who will assist you in optimizing your content strategy and maximizing your earnings.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <button
            onClick={handleRedirect}
            className="bg-blue-600 text-white py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300"
          >
            See Our Packages
          </button>
        </div>
      </div>
    </div>
  );
}

export default BenefitsPackage;
