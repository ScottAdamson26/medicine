import React from "react";
import Student from "./hills2.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../AuthContext";
const Upgrade = ({setSelectedNav}) => {
  const { planName } = useAuth();

  const imageSrc = Student; // Conditionally set the image source

  return (
    <div className="flex flex-row items-center w-full bg-white rounded-xl shadow-lg mb-4">
      
      <img
        src={imageSrc}
        alt="Upgrade Visual"
        className="h-auto max-h-48 rounded-l-xl"
      />
      <div className="flex flex-col ml-8 xl:ml-4 items-start">
        <h1 className="text-lg font-bold text-zinc-900">
          {planName === "Pro Plan"
            ? (
                <div className="justify-left">
                  Master of Medicine <span className="text-2xl">🎓</span>
                </div>
              )
            : "Discover your true potential."
          }
        </h1>
        <h2 className="text-sm font-semibold text-zinc-900 opacity-65 mt-1">
          {planName === "Pro Plan"
            ? "Make the most of your exclusive features"
            : "Upgrade your plan today."}
        </h2>
        <button  onClick={() => setSelectedNav("Quizzes")} className="group px-3 py-1 text-xs font-medium text-cyan-500 rounded-lg bg-cyan-100 mt-2 hover:pr-4 transition flex items-center duration-300 ease-in-out hover:bg-cyan-200">
          {planName === "Pro Plan" ? "Start a quiz" : "See Plans"}
          <FontAwesomeIcon
            icon={faArrowRight}
            className="ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
          />
         
        </button>
      </div>
    </div>
  );
};

export default Upgrade;
