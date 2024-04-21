import React from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthContext';

const Settings = () => {
  const { stripeId, logout } = useAuth();  // Destructure to get stripeId from context

  const handleManageSubscription = async () => {
    if (!stripeId) {
      alert('Stripe ID not found. Please log in again.');
      return;
    }

    try {
      const response = await axios.post('https://us-central1-medicine-ba560.cloudfunctions.net/createPortalSession', { stripeCustomerId: stripeId });
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Failed to open Stripe portal:', error);
      alert('Failed to connect to Stripe. Please try again later.');
    }
  };

  return (
    <div className="w-full rounded-lg shadow-lg p-8 bg-white mb-4">
      <button onClick={handleManageSubscription} className="group px-4 py-2 text-base font-medium text-cyan-500 rounded-lg bg-cyan-100 transition flex items-center duration-300 ease-in-out hover:bg-cyan-200">
        <span className="transition-transform duration-300 ease-in-out">
          Manage Subscription
        </span>
      </button>
      <button onClick={logout} className="mt-4 group px-4 py-2 text-base font-medium text-red-500 rounded-lg bg-red-100 transition flex items-center duration-300 ease-in-out hover:bg-red-200">
        Log Out
      </button>
    </div>
  );
};

export default Settings;
