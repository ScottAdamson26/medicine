import React, { useState } from "react";
import { useAuth } from '../../AuthContext';
import axios from "axios";
import Lottie from "react-lottie";
import spinnerAnimation from "./spinner.json"; // Ensure this path is correct

function Pricing() {
  const { stripeId, loading } = useAuth();
  const [buttonLoading, setButtonLoading] = useState({}); // Object to track loading state of each button

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!stripeId) {
    return <div>Please wait while we're getting everything ready for you.</div>;
  }

  const handleClick = async (priceId) => {
    setButtonLoading(prev => ({ ...prev, [priceId]: true }));
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
      setButtonLoading(prev => ({ ...prev, [priceId]: false }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-zinc-800 p-5">
      <h1 className="text-4xl font-bold mb-5 text-center">Choose a Plan</h1>
      <h2 className="text-xl mb-5 md:mb-12 text-center">
        Select the pricing plan that suits your study needs
      </h2>

      <div className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-7">
        {/* Tier 1 - Free Plan */}
        <div className="bg-gradient-to-r from-blue-300 to-cyan-400 shadow-md rounded-xl p-1">
          <div className="bg-white rounded-lg flex flex-col w-full h-full p-8">
            <h2 className="text-xl font-bold mb-4">Free Plan</h2>
            <ul className="mb-4">
              <li>✔ Feature A</li>
              <li>✔ Feature B</li>
            </ul>
            <button
              className="bg-gradient-to-r from-blue-300 to-cyan-400 text-white px-4 py-2 rounded font-medium flex justify-center items-center"
              onClick={() => handleClick('price_1P8lTVD06bcv6mn0WhXTqhyR')}
              disabled={buttonLoading['price_1P8lTVD06bcv6mn0WhXTqhyR']}
              style={{ width: "100%", height: "40px" }}
            >
              {buttonLoading['price_1P8lTVD06bcv6mn0WhXTqhyR'] ? (
                <div style={{ width: "24px", height: "24px" }}>
                  <Lottie
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: spinnerAnimation,
                      rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice",
                      },
                    }}
                  />
                </div>
              ) : (
                "Choose Plan"
              )}
            </button>
          </div>
        </div>

        {/* Tier 2 - Pro Plan (Most Popular) */}
        <div className="relative bg-gradient-to-r from-blue-300 to-cyan-400 shadow-md rounded-b-xl p-1">
          <div className="bg-gradient-to-r from-blue-300 to-cyan-400 absolute -top-7 left-1/2 transform -translate-x-1/2 bg-blue-500 py-1 text-sm text-white rounded-t-xl inline-flex items-center justify-center w-full">
            Most Popular
          </div>
          <div className="bg-white rounded-b-lg flex flex-col w-full h-full p-8">
            <h2 className="text-xl font-bold mb-4">Pro Plan</h2>
            <ul className="mb-4">
              <li>✔ Feature A</li>
              <li>✔ Feature B</li>
            </ul>
            <button
              className="bg-gradient-to-r from-blue-300 to-cyan-400 text-white px-4 py-2 rounded font-medium flex justify-center items-center"
              onClick={() => handleClick('price_1P72ruD06bcv6mn0gz4bwaKT')}
              disabled={buttonLoading['price_1P72ruD06bcv6mn0gz4bwaKT']}
              style={{ width: "100%", height: "40px" }}
            >
              {buttonLoading['price_1P72ruD06bcv6mn0gz4bwaKT'] ? (
                <div style={{ width: "24px", height: "24px" }}>
                  <Lottie
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: spinnerAnimation,
                      rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice",
                      },
                    }}
                  />
                </div>
              ) : (
                "Choose Plan"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
