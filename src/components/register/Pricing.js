import React from "react";
import { useAuth } from '../../AuthContext';
import axios from "axios";

function Pricing() {
  const { stripeId, loading } = useAuth();

  if (loading) {
    return <div> Hi</div>;  // Use a more visually appealing loader component
  }

  if (!stripeId) {
    return <div>Please wait while we're getting everything ready for you.</div>;
  }

  const handleClick = async (priceId) => {
    const firebaseFunctionUrl = `https://us-central1-medicine-ba560.cloudfunctions.net/createCheckoutSession`;
  
    try {
      const response = await axios.post(firebaseFunctionUrl, {
        priceId,
        stripeCustomerId: stripeId,
      });
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Failed to create checkout session:', error);
      alert("Failed to proceed with payment. Please try again.");
    }
  };
  
 
  return (
    // Use `min-h-screen` to ensure the div takes up at least the height of the screen
    // `flex flex-col` to set up a flex container in a column direction
    // `justify-center items-center` to center the content along both axes
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-zinc-800 p-5">
      <h1 className="text-4xl font-bold mb-5 text-center">Choose a Plan</h1>
      <h2 className="text-xl mb-5 md:mb-12 text-center">
        Select the pricing plan that suits your study needs
      </h2>

      <div className="w-full  max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-7">
        {/* Tier 1 - Free */}
        <div className="bg-gradient-to-r from-blue-300 to-cyan-400 shadow-md rounded-xl p-1 justify-between">
          <div className="bg-white rounded-lg flex flex-col w-full h-full p-8">
            <h2 className="text-xl font-bold mb-4">Free Plan</h2>
            <p className="text-gray-600 mb-4">Try out some of our features</p>
            <ul className="mb-4">
              <li>✔ Everything in Basic</li>
              <li>✔ Feature E</li>
              <li>✔ Feature F</li>
            </ul>
            <button
              className="bg-gradient-to-r from-blue-300 to-cyan-400 text-white px-4 py-2 rounded font-medium"
              onClick={() =>
                (window.location.href =
                  "https://buy.stripe.com/test_bIY16M3645QU5k4eUU")
              }
            >
              Choose Plan
            </button>
          </div>
        </div>

        {/* Tier 2 - Basic */}
        <div className="relative bg-gradient-to-r from-blue-300 to-cyan-400 shadow-md rounded-b-xl p-1 justify-between mt-7 md:mt-0">
          <div className="bg-gradient-to-r from-blue-300 to-cyan-400 absolute -top-7 left-1/2 transform -translate-x-1/2 bg-blue-500 py-1 text-sm text-white rounded-t-xl inline-flex items-center justify-center w-full">
            Most Popular
          </div>
          <div className="bg-white rounded-b-lg flex flex-col w-full h-full p-8">
            <h2 className="text-xl font-bold mb-4">Pro Plan</h2>
            <p className="text-gray-600 mb-4">Basic features for revision</p>
            <ul className="mb-4">
              <li>✔ Everything in Free</li>
              <li>✔ Feature E</li>
              <li>✔ Feature F</li>
            </ul>
            <button
              className="bg-gradient-to-r from-blue-300 to-cyan-400 text-white px-4 py-2 rounded font-medium"
              onClick={(e) => handleClick('price_1P72ruD06bcv6mn0gz4bwaKT')}
            >
              Choose Plan
            </button>
          </div>
        </div>
       
        
      </div>
    </div>
  );
}

export default Pricing;
