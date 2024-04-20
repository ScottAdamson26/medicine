import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Continue = () => {
  // Placeholder percentages for demonstration
  const correctPercentage = 25; // 25% of the questions are answered correctly
  const incorrectPercentage = 15; // 15% of the questions are answered incorrectly
  const unansweredPercentage = 60; // 60% of the questions are unanswered

  return (
    <div className="w-full flex flex-col">
      <h2 className="mb-4">Continue learning</h2>

      {/* outer div */}
      <div className="flex flex-row w-full mb-2 px-4 py-3 text-black rounded-lg shadow-md bg-white items-center justify-between text-base font-regular">
        {/* left div */}
        <div className="flex flex-row items-center w-1/2 h-full">
          {/* logo div */}
          <div className="bg-gradient-to-r from-violet-200 to-pink-200 rounded-lg w-8 h-8 mr-4" />

          <div className="flex-grow">
            <p className="text-sm font-medium mb-1">Neurology</p>
            <div className="w-full flex">
              {correctPercentage > 0 && (
                <div
                  style={{ width: `${correctPercentage}%` }}
                  className="h-1.5 bg-green-400 rounded-md m-0.5"
                ></div>
              )}
              {incorrectPercentage > 0 && (
                <div
                  style={{ width: `${incorrectPercentage}%` }}
                  className="h-1.5 bg-red-400 rounded-md m-0.5"
                ></div>
              )}
              {unansweredPercentage > 0 && (
                <div
                  style={{ width: `${unansweredPercentage}%` }}
                  className="h-1.5 bg-gray-300 rounded-md m-0.5"
                ></div>
              )}
            </div>
          </div>
        </div>

        {/* right div */}
        <div className="w-1/2 flex flex-col items-end">
          <button className="group px-4 py-2 text-xs font-medium text-cyan-500 rounded-lg bg-cyan-100 transition flex items-center duration-300 ease-in-out hover:bg-cyan-200">
            <span className="transition-transform duration-300 ease-in-out">
              Resume
            </span>
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
        </div>
      </div>

      {/* outer div */}
      <div className="flex flex-row w-full mb-2 px-4 py-3 text-black rounded-lg shadow-md bg-white items-center justify-between text-base font-regular">
        {/* left div */}
        <div className="flex flex-row items-center w-1/2 h-full">
          {/* logo div */}
          <div className="bg-gradient-to-r from-green-200 to-lime-200 bg-green-200 rounded-lg w-8 h-8 mr-4" />

          <div className="flex-grow">
            <p className="text-sm font-medium mb-1">General Practice</p>
            <div className="w-full flex">
              {correctPercentage > 0 && (
                <div
                  style={{ width: `${correctPercentage - 10}%` }}
                  className="h-1.5 bg-green-400 rounded-md m-0.5"
                ></div>
              )}
              {incorrectPercentage > 0 && (
                <div
                  style={{ width: `${incorrectPercentage + 10}%` }}
                  className="h-1.5 bg-red-400 rounded-md m-0.5"
                ></div>
              )}
              {unansweredPercentage > 0 && (
                <div
                  style={{ width: `${unansweredPercentage}%` }}
                  className="h-1.5 bg-gray-300 rounded-md m-0.5"
                ></div>
              )}
            </div>
          </div>
        </div>

        {/* right div */}
        <div className="w-1/2 flex flex-col items-end">
          <button className="group px-4 py-2 text-xs font-medium text-cyan-500 rounded-lg bg-cyan-100 transition flex items-center duration-300 ease-in-out hover:bg-cyan-200">
            <span className="transition-transform duration-300 ease-in-out">
              Resume
            </span>
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
        </div>
      </div>

      {/* outer div */}
      <div className="flex flex-row w-full mb-2 px-4 py-3 text-black rounded-lg shadow-md bg-white items-center justify-between text-base font-regular">
        {/* left div */}
        <div className="flex flex-row items-center w-1/2 h-full">
          {/* logo div */}
          <div className="bg-gradient-to-r from-yellow-200 to-amber-200 rounded-lg w-8 h-8 mr-4" />

          <div className="flex-grow">
            <p className="text-sm font-medium mb-1">Ethics and Law</p>
            <div className="w-full flex">
              {correctPercentage > 0 && (
                <div
                  style={{ width: `${correctPercentage + 30}%` }}
                  className="h-1.5 bg-green-400 rounded-md m-0.5"
                ></div>
              )}
              {incorrectPercentage > 0 && (
                <div
                  style={{ width: `${incorrectPercentage}%` }}
                  className="h-1.5 bg-red-400 rounded-md m-0.5"
                ></div>
              )}
              {unansweredPercentage > 0 && (
                <div
                  style={{ width: `${unansweredPercentage - 30}%` }}
                  className="h-1.5 bg-gray-300 rounded-md m-0.5"
                ></div>
              )}
            </div>
          </div>
        </div>

        {/* right div */}
        <div className="w-1/2 flex flex-col items-end">
          <button className="group px-4 py-2 text-xs font-medium text-cyan-500 rounded-lg bg-cyan-100 transition flex items-center duration-300 ease-in-out hover:bg-cyan-200">
            <span className="transition-transform duration-300 ease-in-out">
              Resume
            </span>
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Continue;
