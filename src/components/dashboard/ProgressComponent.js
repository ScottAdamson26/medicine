import React from 'react';

const ProgressComponent = () => {
  return (
    <div className="flex mb-4 text-white"> {/* Container with full width and padding */}
      <div className="flex-1 flex justify-center items-center mr-4 bg-gradient-to-br from-green-400 to-green-300 p-5 rounded-lg shadow"> {/* First div with margin on the right and centered content */}
        <div className="flex items-center justify-center mr-2">
          <span className="text-7xl font-bold">0</span> {/* Larger font size for the number */}
        </div>
        <div className="flex flex-col ml-2">
          <span className="text-3xl">quizzes</span>
          <span className="text-3xl">completed</span>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center bg-gradient-to-br from-red-500 to-red-400 p-5 rounded-lg shadow"> {/* Second div with margin on the left and centered content */}
        <div className="flex items-enter justify-centcer mr-2">
          <span className="text-7xl font-bold">03</span> {/* Larger font size for the number */}
        </div>
        <div className="flex flex-col items-left">
          <span className="text-3xl leading-tight">quizzes</span>
          <span className="text-3xl leading-tight">in progress</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressComponent;
