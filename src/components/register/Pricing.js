import React, { useState } from "react";
import { useAuth } from '../../AuthContext';
import { db } from "../../firebase-config"; // Ensure you have access to your Firebase config
import { doc, setDoc } from "firebase/firestore"; // Import necessary Firestore functions
import axios from "axios";
import Lottie from "react-lottie";
import spinnerAnimation from "./spinner.json"; // Ensure this path is correct
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faCircle
} from "@fortawesome/free-solid-svg-icons";

function Pricing() {
  const { stripeId, currentUser, loading } = useAuth(); // Ensure currentUser is available
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

  const handleFreePlanClick = async () => {
    if (!currentUser) {
      alert("User is not logged in");
      return;
    }

    setButtonLoading(prev => ({ ...prev, free: true }));

    const userId = currentUser.uid;
    const subscriptionId = `sub_${new Date().getTime()}`; // Generate a unique ID for the subscription

    // Format the current date to match the required format
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: true, timeZoneName: 'short'
    });

    const subscriptionData = {
      status: "active",
      items: [{
        price: {
          product: {
            name: "Free Plan"
          }
        }
      }],
      created: formattedDate
    };

    try {
      await setDoc(doc(db, `users/${userId}/subscriptions/${subscriptionId}`), subscriptionData);
      setButtonLoading(prev => ({ ...prev, free: false }));
      window.location.href = "/subscription-success";
    } catch (error) {
      console.error('Failed to create free subscription:', error);
      alert("Failed to create free subscription. Please try again.");
      setButtonLoading(prev => ({ ...prev, free: false }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-zinc-800 py-16 px-10">
      <h1 className="text-4xl font-bold mb-5 text-center">Choose a Plan</h1>
      <h2 className="text-xl mb-5 md:mb-12 text-center">
        Select the pricing plan that suits your study needs
      </h2>

      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:gap-20 gap-16">
        {/* Tier 1 - Free Plan */}
        <div className="bg-gradient-to-r from-blue-300 to-cyan-400 shadow-md rounded-xl p-1 mx-5 md:mx-0 md:ml-10">
          <div className="bg-white rounded-lg flex flex-col w-full h-full py-16 px-8 md:px-12">
            <h2 className="text-xl font-bold mb-4">Free Plan</h2>
            <div className="flex flex-row items-end mb-4 ">
              {" "}
              <h2 className=" font-semibold text-4xl mr-1 ">£0</h2>
              <p className="opacity-60">/ month</p>
            </div>

            <ul className="mb-4">
              <li>✔ 20 trial questions</li>
              <li className="opacity-30">✗ 4 Mock Exams</li>
              <li className="opacity-30">✗ Pomodoro Study Timer</li>
            </ul>
            <button
              className="bg-gradient-to-r from-blue-300 to-cyan-400 text-white px-4 py-2 rounded font-medium flex justify-center items-center"
              onClick={handleFreePlanClick}
              disabled={buttonLoading.free}
            >
              {buttonLoading.free ? (
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
                "Select Plan"
              )}
            </button>
          </div>
        </div>

        {/* Tier 2 - Pro Plan (Most Popular) */}
        <div className="relative bg-gradient-to-r from-blue-300 to-cyan-400 shadow-md rounded-b-xl p-1 mx-5 md:mx-0 md:mr-10">
          <div className="bg-gradient-to-r from-blue-300 to-cyan-400 absolute -top-7 left-1/2 transform -translate-x-1/2 bg-blue-500 py-1 text-sm text-white rounded-t-xl inline-flex items-center justify-center w-full">
            Most Popular
          </div>
          <div className="bg-white rounded-b-lg flex flex-col w-full py-16 px-8 md:px-12">
            <div>
              <button className="inline md:hidden outline-dashed outline-1 text-xs mb-4 font-semibold outline-red-500 rounded-full py-0.5 px-3 text-red-500">
                <FontAwesomeIcon icon={faCircle} beatFade className="mr-2" />
                50% OFF!
              </button>
            </div>
            <div className="flex flex-row items-center mb-4 ">
              {" "}
              <h2 className="text-xl font-bold">Pro Plan</h2>
              <FontAwesomeIcon
                icon={faBolt}
                className="text-yellow-400 ml-2"
              />
              <button className=" hidden md:inline outline-dashed flex items-center outline-1 text-xs font-semibold outline-red-500 rounded-full py-0.5 px-3 ml-2 text-red-500">
                <FontAwesomeIcon
                  icon={faCircle}
                  beatFade
                  className="mr-2 align-middle tra"
                />
                50% OFF!
              </button>
            </div>

            <div className="flex flex-row items-end mb-4 mr-1">
              {" "}
              <h2 className=" font-semibold text-4xl ">£4.97</h2>
              <p className="opacity-60">/ month</p>
            </div>

            <ul className="mb-4">
              <li>✔ 4,000+ Questions</li>
              <li>✔ 4 Mock Exams</li>
              <li>✔ Pomodoro Study Timer</li>
            </ul>
            <button
              className="bg-gradient-to-r from-blue-300 to-cyan-400 text-white px-4 py-2 rounded font-medium flex justify-center items-center"
              onClick={() => handleClick('price_1P72ruD06bcv6mn0gz4bwaKT')}
              disabled={buttonLoading['price_1P72ruD06bcv6mn0gz4bwaKT']}
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
                "Select Plan"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
