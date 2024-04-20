import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './././AuthContext';

function SubscriptionSuccess() {
  const navigate = useNavigate();
  const { currentUser, refreshUser } = useAuth(); // Assume refreshUser is a method to refresh user data

  useEffect(() => {
    if (!currentUser) {
      navigate('/sign-in');
    } else {
      // Refresh user data to ensure subscription status is updated
      refreshUser().then(() => {
        // Redirect to home after a short delay or immediately after data refresh
        setTimeout(() => {
          navigate('/home');
        }, 3000);  // Adjust time as needed
      }).catch(error => {
        console.error('Error updating user data:', error);
        navigate('/sign-in');
      });
    }
  }, [navigate, currentUser, refreshUser]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-xl font-bold">Subscription Activated! Redirecting to dashboard...</h1>
    </div>
  );
}

export default SubscriptionSuccess;
