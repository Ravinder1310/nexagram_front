import React, { useState, useEffect } from "react";
// import Layout from "../components/Layout/Layout";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Confetti from "react-confetti"; // Import Confetti
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import main_logo from "./images/main_lgo.png";

const MobileRecharge = () => {
  const [number, setNumber] = useState("");
  const [plans, setPlans] = useState([]);
  const { user } = useSelector((store) => store.auth);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedOperator, setSelectedOperator] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false); // State for handling recharge button loading
  const [loadingPlans, setLoadingPlans] = useState(false); // State for handling "Get Plans" button loading
  const [rechargeResult, setRechargeResult] = useState(null); // State to store recharge success message
  const [showConfetti, setShowConfetti] = useState(false); // State for confetti
  const [filter, setFilter] = useState("all");
  // Mapping of operator names to their codes
  const operatorCodeMap = {
    Airtel: { planCode: "Airtel", rechargeCode: "MAL" },
    Jio: { planCode: "Jio", rechargeCode: "MJL" },
    Vodafone: { planCode: "Vodafone", rechargeCode: "MVL" },
  };

  const username = "APIRA6478033";
  const pwd = "766269";

  // Function to handle mobile number input with validation
  const handleNumberChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]{0,10}$/; // Allows up to 10 digits
    if (regex.test(value)) {
      setNumber(value);
    }
  };

  const filteredPlans = plans.filter((plan) => {
    // Update the regex to capture only the type value after "type :", make it case insensitive
    const typeMatch = plan.description.match(/type\s*:\s*(\w+\s*\/?\s*\w+)/i);
    const type = typeMatch
      ? typeMatch[1].trim().toUpperCase()
      : "Type not found"; // Trim spaces and convert to uppercase

    if (filter === "all") return true;
    if (filter === "combo" && type === "COMBO") return true;
    if (filter === "3g4g" && type === "3G/4G") return true;
    if (filter === "topup" && type === "TOPUP") return true;

    return false;
  });

  // Function to fetch plans
  const fetchPlans = async () => {
    if (!number) {
      toast("Please enter your mobile number.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "red",
          color: "white",
          fontWeight: 600,
        },
        icon: `⚠️`,
      });
      return;
    }

    if (!selectedOperator) {
      toast("Please select an operator.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "red",
          color: "white",
          fontWeight: 600,
        },
        icon: `⚠️`,
      });
      return;
    }

    const operator = operatorCodeMap[selectedOperator];
    if (!operator || !operator.planCode) {
      console.error(`Invalid operator selected: ${selectedOperator}`);
      toast("Invalid operator selected.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "red",
          color: "white",
          fontWeight: 600,
        },
        icon: `⚠️`,
      });
      return;
    }

    setLoadingPlans(true); // Start loading
    try {
      console.log("Fetching plans for operator:", selectedOperator);
      console.log("Plan Code:", operator.planCode);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/recharge/get-plans`,
        {
          username,
          pwd,
          operatorcode: operator.planCode, // Use the planCode
        }
      );

      console.log("Get Plans API Response:", response.data);

      if (response.data.plan && response.data.plan.length > 0) {
        setPlans(response.data.plan);
        toast("Plans fetched successfully!", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "green",
            color: "white",
            fontWeight: 600,
          },
          icon: `✅`,
        });
      } else {
        toast("No plans available for the selected operator.", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "red",
            color: "white",
            fontWeight: 600,
          },
          icon: `🤔`,
        });
        setPlans([]);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast("Error fetching plans. Please try again.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "red",
          color: "white",
          fontWeight: 600,
        },
        icon: `😢`,
      });
    } finally {
      setLoadingPlans(false); // End loading
    }
  };

  // Function to handle recharge
  const handleRecharge = async () => {
    if (!selectedPlan || !number) {
      toast("Please select a plan and enter your mobile number.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "red",
          color: "white",
          fontWeight: 600,
        },
        icon: `🫠`,
      });
      return;
    }

    const operator = operatorCodeMap[selectedOperator];
    if (!operator || !operator.rechargeCode) {
      console.error(
        `Invalid operator selected for recharge: ${selectedOperator}`
      );
      toast("Invalid operator selected.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "red",
          color: "white",
          fontWeight: 600,
        },
        icon: `⚠️`,
      });
      return;
    }

    setLoading(true); // Set loading state to true
    const formData = {
      username,
      pwd,
      operatorcode: operator.rechargeCode, // Use the rechargeCode
      number,
      userId: user?._id,
      amount: selectedPlan.mrp,
      client_id: Math.floor(10000000 + Math.random() * 90000000).toString(),
    };

    try {
      console.log("Processing recharge for operator:", selectedOperator);
      console.log("Recharge Code:", operator.rechargeCode);
      console.log("Form Data:", formData);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/recharge/recharge`,
        formData
      );

      console.log("Recharge API Response:", response.data);

      setLoading(false); // Reset loading state

      if (response.data.error_code == "0") {
        setRechargeResult(response.data.message); // Set success message
        setShowConfetti(true); // Show confetti
        toast(response.data.message, {
          duration: 4000,
          position: "top-center",
          style: {
            background: "green",
            color: "white",
            fontWeight: 600,
          },
          icon: `😀`,
        });

        // Automatically hide confetti after 5 seconds
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
      } else {
        toast(response.data.message || "Recharge failed.", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "red",
            color: "white",
            fontWeight: 600,
          },
          icon: `😢`,
        });
      }
    } catch (error) {
      console.error("Error processing recharge:", error);
      setLoading(false); // Reset loading state
      toast("Error processing recharge.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "red",
          color: "white",
          fontWeight: 600,
        },
        icon: `😢`,
      });
    }
  };

  const handleType = (des) => {
    setType(type);
  };

  // Function to reset recharge form
  const resetRecharge = () => {
    setRechargeResult(null);
    setNumber("");
    setSelectedOperator("");
    setPlans([]);
    setSelectedPlan(null);
  };

  return (
    <div>
      {/* Toaster for showing toast messages */}
      <Toaster />

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="w-[100%]">
          <Confetti
            numberOfPieces={500}
            recycle={false}
            gravity={0.3}
            colors={[
              "#FF0000",
              "#00FF00",
              "#0000FF",
              "#FFFF00",
              "#FF00FF",
              "#00FFFF",
            ]}
          />
        </div>
      )}

      <div className="w-full md:w-[100%] lg:w-[100%] sm:mt-14 m-auto pt-20 h-[900px] sm:pt-10">
        {!selectedPlan && (
          <img src={main_logo} className="h-[110px] m-auto" />
        )}

        {/* Conditional Rendering Based on Recharge Result */}
        {!rechargeResult ? (
          <>
            {/* Dropdown for Operator Selection and Mobile Number Input */}
            {plans.length === 0 && (
              <div className="mt-10">
                <div className="flex flex-wrap sm:justify-between w-[100%] sm:w-[50%] m-auto justify-center shadow-xl py-1 px-4 rounded-lg">
                  <div className="mb-6 w-full sm:w-auto sm:mr-4">
                    <div className="flex items-center bg-white shadow-lg h-[70px] rounded-md px-4 py-2 border border-gray-200">
                      {/* Left Icon (Phone) */}
                      <div className="text-orange-500">
                        <FontAwesomeIcon
                          icon={faPhoneAlt}
                          className="text-xl"
                        />
                      </div>

                      {/* Divider */}
                      <div className="border-l h-6 mx-3 border-gray-300"></div>

                      {/* Input Field */}
                      <input
                        type="text"
                        placeholder="Enter Mobile Number"
                        className="w-full focus:outline-none text-orange-500 placeholder-orange-500 text-xl"
                        value={number}
                        onChange={handleNumberChange}
                      />

                      {/* Right Icon (User) */}
                      <div className="text-orange-500">
                        <FontAwesomeIcon icon={faUser} className="text-xl" />
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 w-full sm:w-auto sm:mr-4 h-[70px] text-orange-500 shadow-lg">
                    <select
                      name="operator"
                      className="shadow appearance-none border rounded h-[70px] text-xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
                      onChange={(e) => {
                        const operatorName = e.target.value;
                        setSelectedOperator(operatorName);
                        setSelectedPlan(null);
                        setPlans([]); // Clear previous plans when operator changes
                      }}
                      value={selectedOperator}
                    >
                      <option value="">Select Operator</option>
                      <option value="Airtel">Airtel</option>
                      <option value="Jio">Jio</option>
                      <option value="Vodafone">Vodafone</option>
                    </select>
                  </div>

                  {/* Get Plans Button */}
                  <button
                    className={`bg-orange-500 mt-10 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto mb-6 flex items-center justify-center ${
                      loadingPlans ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={fetchPlans}
                    disabled={loadingPlans} // Disable button while loading
                  >
                    {loadingPlans ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-3 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          ></path>
                        </svg>
                        Getting Plans...
                      </span>
                    ) : (
                      "Get Plans"
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Plans List - Conditionally Rendered */}
            <div>
              {/* Filter Section */}
              {/* Filter Section */}
              {
                !selectedPlan && (
                  <div className="bg-white rounded pt-6 pb-8 w-[95%] sm:w-[50%] m-auto">
                  <div className="flex justify-around border-b-1 mt-10 text-lg font-bold text-orange-600">
                    <button
                      className={filter === "all" ? "underline" : ""}
                      onClick={() => setFilter("all")}
                    >
                      All
                    </button>
                    <div className="border border-orange-700"></div>
                    <button
                      className={filter === "3g4g" ? "underline" : ""}
                      onClick={() => setFilter("3g4g")}
                    >
                      Data Add on
                    </button>
                    <div className="border border-orange-700"></div>
                    <button
                      className={filter === "combo" ? "underline" : ""}
                      onClick={() => setFilter("combo")}
                    >
                      Combo
                    </button>
                    <div className="border border-orange-700"></div>
                    <button
                      className={filter === "topup" ? "underline" : ""}
                      onClick={() => setFilter("topup")}
                    >
                      Topup
                    </button>
                  </div>
                  <hr className="mt-2" />
                </div>
                )
              }
             

              {/* Plan List Section */}
              {!selectedPlan && (
                <div className="bg-white shadow-md rounded px-1 pt-6 pb-8 mb-10 max-h-[500px] overflow-y-auto w-[90%] sm:w-[50%] m-auto">
                  <ul>
                    {filteredPlans.length > 0 ? (
                      filteredPlans.map((plan, index) => (
                        <li
                          key={index}
                          className="mb-4 bg-gray-100 rounded shadow-md cursor-pointer transition-all flex items-center py-2 justify-between"
                          onClick={() => {
                            setSelectedPlan(plan);
                          }}
                        >
                          {/* Price and Validity Section */}
                          <div>
                            <p className="text-orange-600 font-bold text-xl">
                              ₹{plan.mrp}
                            </p>
                          </div>
                          {/* Plan Description */}
                          <div className="text-gray-500 ml-4 flex-1 text-left">
                            <p className="text-gray-700 font-semibold">
                              Validity: {plan.validity}
                            </p>
                            <p>
                              {plan.description
                                .split(" ")
                                .slice(0, 30)
                                .join(" ")}
                              ...
                            </p>
                          </div>
                        </li>
                      ))
                    ) : (
                      <p className="text-gray-600 text-center">
                        No plans found for the selected filter
                      </p>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Selected Plan Details */}
            {selectedPlan && (
              <div className="mt-6 bg-orange-500 font-bold p-6 rounded-lg text-white shadow-lg w-[90%] sm:w-[50%] m-auto">
                <h3 className="text-lg font-bold text-center  mb-4">
                  Selected Plan
                </h3>
                <p className="text-center  mb-2">
                  Operator: {selectedPlan.operator_name}
                </p>
                <p className="text-center  mb-2">
                  Amount: ₹{selectedPlan.mrp}
                </p>
                <p className="text-center  mb-2">
                  Validity: {selectedPlan.validity} days
                </p>
                <p className="text-center  mb-2">
                  Talktime: {selectedPlan.talktime} minutes
                </p>
                <p className="text-center  mb-2">
                  Data Benefits: {selectedPlan.data} GB
                </p>
                <p className="text-center ">
                  Description: {selectedPlan.description}
                </p>

                <div className="sm:flex grid justify-center mt-6 sm:space-x-4">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 mb-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => {
                      setSelectedPlan(null);
                      setPlans(plans); // Optionally, you can refetch plans or keep them
                    }}
                  >
                    Change Plan
                  </button>

                  <button
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 px-4 rounded focus:outline-none focus:shadow-outline relative ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handleRecharge}
                    disabled={loading} // Disable button while loading
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-3 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Proceed to Recharge"
                    )}
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          // Recharge Success Message
          <div className="flex flex-col items-center justify-center bg-orange-500 text-white p-8 shadow-md mt-[150px] sm:mt-[70px] w-[90%] sm:w-[40%] m-auto rounded-xl">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Recharge Successful!
            </h3>
            <p className="text-center  mb-6 font-bold">{rechargeResult}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={resetRecharge}
            >
              Recharge Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileRecharge;
