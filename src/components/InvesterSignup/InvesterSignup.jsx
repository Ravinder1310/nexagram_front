import React, { useState, useEffect } from "react";
import "./InvesterSignup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faCodeBranch,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const InvesterSignup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [referredBy, setReferredCode] = useState("");
  const [walletDetected, setWalletDetected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state

  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Get location to parse query params

  // Detect wallet provider and fetch wallet address and network
  useEffect(() => {
    const checkWalletAndNetwork = async () => {
      if (window.ethereum) {
        setWalletDetected(true);
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setWalletAddress(accounts[0]);

          const chainId = await window.ethereum.request({
            method: "eth_chainId",
          });
          if (chainId !== "0x38") {
            showPopup(
              "Please switch to Binance Smart Chain (BSC) network.",
              "error"
            );
          } else {
            showPopup("Connected to Binance Smart Chain (BSC).", "success");
          }
        } catch (err) {
          if (err.code === 4001) {
            showPopup(
              "Connection request was rejected. Please connect your wallet.",
              "error"
            );
          } else {
            showPopup("Error connecting to wallet. Please try again.", "error");
          }
        }
      } else {
        setWalletDetected(false);
      }
    };

    checkWalletAndNetwork();

    // Set up listeners for account or network changes
    window.ethereum?.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        showPopup("Wallet address changed.", "success");
      } else {
        setWalletAddress(null);
        showPopup("Wallet disconnected. Please reconnect.", "error");
      }
    });

    window.ethereum?.on("chainChanged", (chainId) => {
      if (chainId === "0x38") {
        showPopup("Switched to Binance Smart Chain (BSC) network.", "success");
      } else {
        showPopup(
          "Please switch to Binance Smart Chain (BSC) network.",
          "error"
        );
      }
    });
  }, []);

  // Fetch referral code and preferred side from the URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const referralCodeFromUrl = queryParams.get("referral");
    const sideFromUrl = queryParams.get("side");

    if (referralCodeFromUrl) {
      setReferredCode(referralCodeFromUrl); // Set the referral code if it's in the URL
    }

    if (sideFromUrl) {
      setSelectedPosition(sideFromUrl); // Set the selected position if it's in the URL
    }
  }, [location.search]); // Only run when location.search changes

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    if (!walletDetected) {
      showPopup(
        "No wallet detected. Please install MetaMask or Trust Wallet.",
        "error"
      );
      setLoading(false); // Stop loading
      return;
    }

    if (!walletAddress) {
      showPopup("Wallet address is required.", "error");
      setLoading(false); // Stop loading
      return;
    }

    const formData = {
      userName: userName,
      email: email,
      phone: phone,
      referredBy: referredBy,
      preferredSide: selectedPosition,
      walletAddress: walletAddress,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/invester/signup`,
        formData
      );

      if (response.status === 201) {
        showPopup("User registered successfully", "success");
        setSuccessMessage(response.data.message);
        navigate("/invester-login");
      } else {
        showPopup(response.data.message || "Signup failed", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showPopup(
        error.response?.data?.message || "Something went wrong",
        "error"
      );
    }

    setLoading(false); // Stop loading when done
  };

  // Function to show the popup message
  const showPopup = (message, type) => {
    setPopupMessage(message);
    setPopupVisible(true);
    setTimeout(() => {
      setPopupVisible(false);
    }, 3000); // Auto-hide after 3 seconds
  };

  return (
    <div className="signUp-container">
      <div className="signUp-card">
        <div className="text-3xl font-bold text-center">
        Sign Up
        </div>

        {/* Wallet Provider Check */}
        {!walletDetected && (
          <p style={{ color: "red" }}>
            No wallet detected. Please install MetaMask or Trust Wallet.
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="w-full">
              {/* <label className="text-black">User Name</label> */}

              <input
                type="text"
                name="userName"
                value={userName}
                placeholder="Enter user name"
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <FontAwesomeIcon className="mr-3" icon={faUser} />
          </div>
          <div className="form-group">
            <div className="w-full">
              {/* <label className="text-black">Email</label> */}
              <input
                className="w-full"
                type="email"
                name="email"
                value={email}
                 placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <FontAwesomeIcon
              className=""
              icon={faEnvelope}
            />
          </div>
          <div className="form-group">
            <div className="w-full">
              {/* <label className="text-black">Phone</label> */}
              <input
                className="w-full"
                type="text"
                name="phone"
                value={phone}
                 placeholder="Enter phone number"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <FontAwesomeIcon
              className="mr-3"
              icon={faPhone}
            />
          </div>
          <div className="form-group">
            <div className="w-full">
              {/* <label className="text-black">Referral Code</label> */}
              <input
                type="text"
                name="referralCode"
                value={referredBy}
                 placeholder="Enter referral Code"
                onChange={(e) => setReferredCode(e.target.value)}
              />
            </div>
            <FontAwesomeIcon
              className="mr-3"
              icon={faCodeBranch}
            />
          </div>

          {/* <h2 className="choose-position">Position</h2>

          <div className="position-selector">
            <div className="position-options">
              <div
                className={`position-box text-black ${
                  selectedPosition === "left" ? "selected" : ""
                }`}
                onClick={() =>
                  selectedPosition !== null ? null : setSelectedPosition("left")
                }
                style={{
                  cursor: selectedPosition === null ? "pointer" : "not-allowed",
                }}
              >
                Left
              </div>
              <div
                className={`position-box text-black ${
                  selectedPosition === "right" ? "selected" : ""
                }`}
                onClick={() =>
                  selectedPosition !== null
                    ? null
                    : setSelectedPosition("right")
                }
                style={{
                  cursor: selectedPosition === null ? "pointer" : "not-allowed",
                }}
              >
                Right
              </div>
            </div>
          </div> */}

        <div className="flex justify-center ">
        <input
            id="btn"
            className={`bg-blue-500 w-full h-12 rounded-lg text-white ${
              loading ? "cursor-not-allowed" : ""
            }`}
            type="submit"
            value={loading ? "Loading..." : "Proceed"} // Show loading text
            disabled={loading} // Disable button while loading
          />
        </div>

          {formError && <p style={{ color: "red" }}>{formError}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

          <p className="mt-3" >
            Already have an account?{" "}
            <a className="ml-8 text-yellow-500" href="/invester-login">
              Login
            </a>
          </p>
        </form>
      </div>

      {/* Popup Modal */}
      {popupVisible && (
        <div className={`popup ${popupVisible ? "show" : ""}`}>
          <p>{popupMessage}</p>
        </div>
      )}
    </div>
  );
};

export default InvesterSignup;
