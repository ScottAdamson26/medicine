import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCirclePause,
  faRotateRight,
  faSliders,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import TimerSettings from "./TimerSettings";

function Timer() {
  const [isActive, setIsActive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [sessionTime, setSessionTime] = useState(1500); // Default session time
  const [breakTime, setBreakTime] = useState(300); // Default break time
  const [sessionsCount, setSessionsCount] = useState(2); // Default number of sessions

  const [timeLeft, setTimeLeft] = useState(sessionTime); // Tracks the remaining time
  const [isSession, setIsSession] = useState(true);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [allSessionsComplete, setAllSessionsComplete] = useState(false); // New state to track completion of all sessions

  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && !allSessionsComplete) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);

      if (timeLeft === 0) {
        clearInterval(interval);
        if (isSession) {
          setIsSession(false);
          setTimeLeft(breakTime);
        } else {
          if (sessionsCompleted + 1 >= sessionsCount) {
            setIsActive(false);
            setAllSessionsComplete(true); // Indicate all sessions are complete push
            setTimeLeft(sessionTime); // No need to reset here for now
          } else {
            setIsSession(true);
            setSessionsCompleted(sessionsCompleted + 1);
            setTimeLeft(sessionTime);
          }
        }
      }
    }

    return () => clearInterval(interval);
  }, [
    isActive,
    timeLeft,
    isSession,
    sessionsCompleted,
    sessionTime,
    breakTime,
    sessionsCount,
    allSessionsComplete,
  ]);

  const toggle = () => {
    if (allSessionsComplete) {
      // Directly start a new session instead of just resetting the states
      setSessionsCompleted(0);
      setIsSession(true);
      setTimeLeft(sessionTime);
      setIsActive(true); // Directly set isActive to true to start the timer
      setAllSessionsComplete(false);
      setSessionStarted(true); // Ensure the session is marked as started
    } else {
      setIsActive(!isActive); // Simply toggle the active state if not all sessions were complete
      if (!sessionStarted) {
        setSessionStarted(true);
      }
    }
  };


  // Inside your component
  const resetTimer = useCallback(() => {
    setIsActive(false);
    setIsSession(true);
    setSessionStarted(false);
    setSessionsCompleted(0);
    setTimeLeft(sessionTime); // Reset to initial session time
    setAllSessionsComplete(false); // Reset the completion flag
  }, [sessionTime]); // Include all dependencies here that resetTimer uses
  
  useEffect(() => {
    resetTimer();
  }, [resetTimer, sessionTime, breakTime, sessionsCount]); // Now resetTimer is stable unless its dependencies change
  
  function handleSettingsUpdate(
    newSessionTime,
    newBreakTime,
    newSessionsCount
  ) {
    setSessionTime(newSessionTime);
    setBreakTime(newBreakTime);
    setSessionsCount(newSessionsCount);
  }
  useEffect(() => {
    resetTimer();
   
  }, [sessionTime, breakTime, sessionsCount, resetTimer]); // React will check for changes in these values.

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60; // Corrected this line
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds
    }`;
  };

  const getMessage = () => {
    if (allSessionsComplete) {
      return "Session over! Well done!";
    } else if (!isActive && sessionsCompleted === 0 && !sessionStarted) {
      return "Start a study session!";
    } else if (!isActive && sessionStarted) {
      return "Resume your session!";
    } else if (isActive) {
      return isSession ? "Focus time!" : "Break time!";
    }
    return "Ready to start!";
  };

  return (
    <div className="flex justify-center items-center mb-4 w-full">
      <div className="relative flex flex-col items-center justify-center h-52 bg-gradient-to-r from-purple-200 to-fuchsia-300 text-white rounded-lg shadow-lg w-full">
        <FontAwesomeIcon
          icon={faCircleInfo}
          className="absolute top-4 left-4 text-sm text-white opacity-65 hover:opacity-100 focus:opacity-100 outline-none"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          tabIndex="0" // Make icon focusable
        />

        {showTooltip && (
          <div
            className={`absolute text-center p-4 z-50 text-gray-950 text-xs bg-white bg-opacity-30 backdrop-blur rounded-md shadow-lg
    ${showTooltip ? "block" : "hidden"} 
    left-4 transform -translate-x-1/2
    -top-10 md:top-10`}
          >
            This is a Pomodoro Timer designed to enhance productivity by dividing work into 25-minute focused sessions followed by 5-minute breaks. Feel free to customize the session lengths and break times to suit your workflow.
          </div>
        )}

        <h3 className="mb-1">{getMessage()}</h3>
        <div className="text-5xl font-bold">{formatTime(timeLeft)}</div>

        <div className="flex items-center justify-center space-x-6 mt-3">
          <button
            className="text-white opacity-65 hover:text-gray-100 mb-1"
            onClick={() => setShowSettings(true)}
          >
            <FontAwesomeIcon icon={faSliders} className="text-base" />
          </button>
          <button onClick={toggle}>
            <FontAwesomeIcon
              icon={isActive ? faCirclePause : faCirclePlay}
              className="text-4xl"
            />
          </button>
          <button
            className="text-white opacity-65 hover:text-gray-100 mb-1"
            onClick={resetTimer}
          >
            <FontAwesomeIcon icon={faRotateRight} className="text-base" />
          </button>
        </div>
      </div>
      {showSettings && (
        <TimerSettings
          onClose={() => setShowSettings(false)}
          updateSettings={handleSettingsUpdate}
        />
      )}
    </div>
  );
}

export default Timer;
