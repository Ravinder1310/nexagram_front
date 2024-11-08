import React, { useEffect, useState } from "react";
import Sidebar from "../AdminSidebar/Sidebar";
import axios from "axios";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import { toast, ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../../context/auth";
import { useSelector } from "react-redux";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [copiedReferralCode, setCopiedReferralCode] = useState(null);
  const navigate = useNavigate();
  const { allUsers } = useSelector((store) => store.auth);
  const getData = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/admin/all-users`
      );
      setUsers(result.data.users);
    } catch (err) {
      console.log("error while getting all users", err);
    }
  };

  const handleCopy = (referralCode) => {
    navigator.clipboard.writeText(referralCode);
    setCopiedReferralCode(referralCode);

    // Reset the copied state after 2-3 seconds
    setTimeout(() => {
      setCopiedReferralCode(null);
    }, 2000);
  };
  useEffect(() => {
    getData();
  }, []);

  const toggleBlockedStatus = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/admin/user-block-status/${id}`, {
        isBlocked: updatedStatus,
      });

      // toast.success(updatedStatus ? 'User blocked successfully' : 'User unblocked successfully');
      getData();
    } catch (err) {
      console.log("error while toggling blocked status", err);
    }
  };

  const userAccess = async (e, mobileNumber, password) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, { mobileNumber, password });

      if (res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        window.open('/', '_blank');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  console.log("alll users in admin allusers =====>",users)
  return (
    <div className="flex min-h-screen  bg-gradient-to-b from-green-400 to-blue-500">
      {/* Sidebar */}
      <Sidebar className="fixed w-64 h-full bg-white shadow-lg" />

      {/* Main Content */}
      <div className="ml-64 w-full p-6  bg-gradient-to-b from-green-400 to-blue-500">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">All User List</h2>
        <div className="overflow-x-auto">
          <table className=" text-sm bg-white border border-gray-300 rounded-lg shadow-md divide-y divide-gray-200">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="py-3 px-4 border-b text-left w-[100px]">S.No</th>
                <th className="py-3 px-4 border-b text-left w-[100px]">Email</th>
               
                <th className="py-3 px-4 border-b text-left">Referral Code</th>
                <th className="py-3 px-4 border-b text-left">Referred By</th>
                <th className="py-3 px-4 border-b text-left">User Name</th>
                <th className="py-3 px-4 border-b text-left">Mobile No</th>
                {/* <th className="py-3 px-4 border-b text-left">Password</th> */}
                <th className="py-3 px-4 border-b text-left">Wallet</th>
                <th className="py-3 px-4 border-b text-left">Registered At</th>
                <th className="py-3 px-4 border-b text-left">Status</th>
                <th className="py-3 px-4 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="text-gray-700 hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                 
                  <td className="py-2 px-4 border-b text-blue-600 hover:text-blue-800">
                    <div className="flex hover:cursor-pointer  items-center space-x-2">
                      <span >
                        {user.referralCode}
                      </span>
                      <button
                        onClick={() => handleCopy(user.referralCode)}
                        className={`text-xs py-1 px-2 rounded ${copiedReferralCode === user.referralCode ? 'bg-green-200 text-green-800' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                      >
                        {copiedReferralCode === user.referralCode ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">{user.referredBy || "No reference"}</td>
                  <td className="py-2 px-4 border-b">{user?.username}</td>
                  <td className="py-2 px-4 border-b">{user.phone}</td>
                  {/* <td className="py-2 px-4 border-b truncate max-w-xs">{user.password}</td> */}
                  <td className="py-2 px-4 border-b">{Math.floor(user.earningWallet)}</td>
                  <td className="py-2 px-4 border-b">
                    {`${new Date(user.createdAt).toLocaleDateString()} ${new Date(user.createdAt).toLocaleTimeString()}`}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span className={`px-3 py-1 rounded-full text-white ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <MenuButton className="flex items-center gap-x-1.5 rounded-lg z-10 bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none">
                          Action
                          <ChevronDownIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                        </MenuButton>
                      </div>
                      <MenuItems className="absolute right-0 mt-2 w-40 z-10 origin-bottom-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          <MenuItem>
                            <button
                              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => navigate('/dashboard/admin/update-user', { state: { data: user } })}
                            >
                              Edit User
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => toggleBlockedStatus(user._id, user.isBlocked)}
                            >
                              {user.isBlocked ? 'Unblock' : 'Block User'}
                            </button>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default AllUsers;
