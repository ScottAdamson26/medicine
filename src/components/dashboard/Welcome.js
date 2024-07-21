import React from "react";
import Doctor from "./doctorsimnew2.webp";
import { useAuth } from "../../AuthContext";

const Welcome = () => {
  const { name } = useAuth();

  let welcomeMessage = "Welcome to Dr Revision";
  if (name != null) {
    welcomeMessage = "Welcome back, " + name;
  }

  return (
    <div className="relative w-full rounded-lg">
      <div className="relative z-10 mt-8 flex items-center justify-between rounded-lg bg-gradient-to-r from-blue-300 to-cyan-400 px-8 text-3xl text-white shadow-lg lg:px-12 xl:px-16 lg:text-4xl">
        <span>{welcomeMessage}</span>
        <div className="relative z-20 -mt-8 h-auto w-36 overflow-hidden">
          <img src={Doctor} alt="Doctor" className="h-auto w-full" />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
