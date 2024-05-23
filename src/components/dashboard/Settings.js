import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAuth } from "firebase/auth";
import ConfirmationModal from "./ConfirmationModal"; // Import the modal

const Settings = () => {
  const { currentUser, stripeId, logout } = useAuth();
  const navigate = useNavigate(); // Hook for navigation
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleManageSubscription = async () => {
    if (!stripeId) {
      alert("Stripe ID not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        "https://us-central1-medicine-ba560.cloudfunctions.net/createPortalSession",
        { stripeCustomerId: stripeId }
      );
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Failed to open Stripe portal:", error);
      alert("Failed to connect to Stripe. Please try again later.");
    }
  };

  const handleDeleteAccount = async (setStatus) => {
    if (!currentUser) {
      alert("No user is currently logged in.");
      return;
    }

    try {
      await axios.post(
        "https://us-central1-medicine-ba560.cloudfunctions.net/deleteUserData",
        { uid: currentUser.uid }
      );

      // Delete user's authentication record
      const user = getAuth().currentUser;
      await deleteUser(user);

      setStatus("success");
      navigate("/account-deleted");
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("Failed to delete account. Please try again later.");
    }
  };

  return (
    <div className="mb-4 w-full rounded-lg bg-white p-8 shadow-lg">
      <button
        onClick={handleManageSubscription}
        className="group flex items-center rounded-lg bg-cyan-100 px-4 py-2 text-base font-medium text-cyan-500 transition duration-300 ease-in-out hover:bg-cyan-200"
      >
        <span className="transition-transform duration-300 ease-in-out">
          Manage Subscription
        </span>
      </button>
      <button
        onClick={() => setIsModalOpen(true)} // Open the modal on click
        className="group mt-4 flex items-center rounded-lg bg-indigo-100 px-4 py-2 text-base font-medium text-indigo-500 transition duration-300 ease-in-out hover:bg-indigo-200"
      >
        <span className="transition-transform duration-300 ease-in-out">
          Delete Account
        </span>
      </button>
      <button
        onClick={logout}
        className="group mt-4 flex items-center rounded-lg bg-red-100 px-4 py-2 text-base font-medium text-red-500 transition duration-300 ease-in-out hover:bg-red-200"
      >
        Log Out
      </button>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
};

export default Settings;
