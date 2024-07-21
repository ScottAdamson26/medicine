import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../AuthContext";
import { auth } from "../../firebase-config";
import { sendEmailVerification } from "firebase/auth";
import Lottie from "react-lottie";
import spinnerAnimation from "./spinner.json"; // Verify this path is correct

const Alert = () => {
  const { emailVerified } = useAuth();
  const [buttonState, setButtonState] = useState("Send Email");

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: spinnerAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleSendEmail = async () => {
    const actionCodeSettings = {
      url: `${window.location.origin}/sign-in`,
      handleCodeInApp: true,
    };

    try {
      setButtonState("loading");
      await sendEmailVerification(auth.currentUser, actionCodeSettings);
      setButtonState("Sent!");
    } catch (error) {
      console.error("Error sending email verification: ", error);
      setButtonState("Send Email");
    }
  };

  if (emailVerified) {
    return null;
  }

  return (
    <div className="bg-white mb-4 text-rose-500 shadow-lg text-sm md:text-xs  w-full rounded-lg px-3 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faCircleExclamation} className="text-xl mr-3" />
        <span>Please verify your email address.</span>
      </div>
      <button
        onClick={handleSendEmail}
        className="bg-gradient-to-r from-red-400 to-rose-500 py-0.5 sm:py-1 px-2 rounded-lg text-white shadow-md hover:bg-rose-50 flex items-center justify-center"
      >
        {buttonState === "loading" ? (
          <div className="flex items-center justify-center">
            <Lottie options={defaultOptions} height={20} width={20} />
          </div>
        ) : (
          buttonState
        )}
      </button>
    </div>
  );
};

export default Alert;
