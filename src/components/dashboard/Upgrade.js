import React from "react";
import Student from "./hills2.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Upgrade = () => {
  return (
    <div className="flex flex-row items-center w-full bg-white rounded-xl shadow-lg mb-4">
      <img
        src={Student}
        alt="Student"
        className="h-auto max-h-48 rounded-l-xl"
      />
      <div className="flex flex-col ml-4 items-start">
        <h1 className="text-lg font-bold text-zinc-900">
          Discover your true potential.
        </h1>
        <h2 className="text-sm font-semibold text-zinc-900 opacity-65 mt-1">
          Upgrade your plan today.
        </h2>
        <button className="group px-3 py-1 text-xs font-medium text-cyan-500 rounded-lg bg-cyan-100 mt-2 hover:pr-4 transition flex items-center duration-300 ease-in-out hover:bg-cyan-200">
          <span>See Plans</span>
          <FontAwesomeIcon icon={faArrowRight} className="ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1"/>
        </button>
      </div>
    </div>
  );
};

export default Upgrade;
