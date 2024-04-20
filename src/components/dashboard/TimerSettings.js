import React, { useState } from "react";

const TimerSettings = ({ onClose, updateSettings}) => {
  // Session durations in seconds
  const durations = [15 * 60, 25 * 60, 45 * 60];
  
  // Use state directly provided to ensure settings are immediately updated
  const [selectedDuration, setSelectedDuration] = useState(durations[1]); // Default to 25 minutes

  // Break durations in seconds
  const breakDurations = [5 * 60, 10 * 60, 15 * 60];
  const [selectedBreakDuration, setSelectedBreakDuration] = useState(breakDurations[0]); // Default to 5 minutes

  // Number of sessions
  const sessionCounts = [1, 2, 3, 4, 5];
  const [selectedSessionCount, setSelectedSessionCount] = useState(2); // Default to 2 sessions

  const saveSettings = () => {
    updateSettings(selectedDuration, selectedBreakDuration, selectedSessionCount);
    console.log(`Session Duration: ${selectedDuration / 60} minutes`);
    console.log(`Break Duration: ${selectedBreakDuration / 60} minutes`);
    console.log(`Number of Sessions: ${selectedSessionCount}`);
    onClose();
  };
  

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center">
      <div className="bg-gradient-to-r from-purple-200 to-fuchsia-300 p-1 rounded-xl shadow-xl">
        <div className="bg-white p-8 rounded-lg shadow-lg z-50 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Edit your study session.</h2>
          <p className="text-sm mb-2">How long would you like your sessions?</p>
          <div className="flex space-x-2 mb-4">
            {durations.map((duration) => (
              <button
                key={duration}
                onClick={() => setSelectedDuration(duration)}
                className={`text-sm py-1 px-4 rounded-full transition-colors duration-300 ease-in-out 
                  ${
                    selectedDuration === duration
                      ? "bg-gradient-to-r from-purple-200 to-fuchsia-300 text-white"
                      : "bg-white text-purple-700 border border-purple-200 hover:bg-purple-50"
                  }`}
              >
                {`${duration / 60} mins`}
              </button>
            ))}
          </div>

          <p className="text-sm mb-2">How long would you like your breaks?</p>
          <div className="flex space-x-2 mb-4">
            {breakDurations.map((duration) => (
              <button
                key={duration}
                onClick={() => setSelectedBreakDuration(duration)}
                className={`text-sm py-1 px-4 rounded-full transition-colors duration-300 ease-in-out 
                  ${
                    selectedBreakDuration === duration
                      ? "bg-gradient-to-r from-purple-200 to-fuchsia-300 text-white"
                      : "bg-white text-purple-700 border border-purple-200 hover:bg-purple-50"
                  }`}
              >
                {`${duration / 60} mins`}
              </button>
            ))}
          </div>

          <p className="text-sm mb-2">How many sessions?</p>
          <div className="flex space-x-2 mb-4">
            {sessionCounts.map((count) => (
              <button
                key={count}
                onClick={() => setSelectedSessionCount(count)}
                className={`text-sm py-1 px-4 rounded-full transition-colors duration-300 ease-in-out 
                  ${
                    selectedSessionCount === count
                      ? "bg-gradient-to-r from-purple-200 to-fuchsia-300 text-white"
                      : "bg-white text-purple-700 border border-purple-200 hover:bg-purple-50"
                  }`}
              >
                {count}
              </button>
            ))}
          </div>

          <button
            onClick={saveSettings}
            className="mt-2 bg-gradient-to-r from-purple-300 to-fuchsia-300 text-white font-bold py-1 text-md px-4 rounded transition-all duration-300 ease-in-out hover:from-purple-400 hover:to-fuchsia-400"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerSettings;