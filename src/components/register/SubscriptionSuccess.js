import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function SubscriptionSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timer to navigate to '/home' after 5 seconds
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2000);

    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center text-white bg-cyan-400">
      <FontAwesomeIcon
        icon={faCircleCheck}
        className="fa-beat text-4xl"  // Using Font Awesome's built-in "beat" animation class
      // Styling can be adjusted as needed
      />
      <h1 className="text-2xl font-semibold mt-3">
        Subscription successfully activated! Redirecting...
      </h1>
    </div>
  );
}

export default SubscriptionSuccess;
