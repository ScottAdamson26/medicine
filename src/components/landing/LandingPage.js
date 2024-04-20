import React from "react";
import LandingNavBar from "./LandingNavBar";
// Import the image
import DoctorImage from "./doctor.png"; // Adjust the path as necessary
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function LandingPage() {
  return (
    <div className="flex flex-col mx-auto min-h-screen max-w-6xl p-2">
      <LandingNavBar />

      {/* hero */}
      <div className="flex flex-col md:flex-row flex-grow items-center md:justify-between px-5 md:px-10 mt-10 md:mt-0 py-0 md:py-36">
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-bold text-zinc-800">
            Take Control of
            <span className="hidden md:inline">
              <br />
            </span>{" "}
            <span className="bg-gradient-to-r from-blue-300 to-cyan-400 inline-block text-transparent bg-clip-text">
              {" "}
              Your
            </span>{" "}
            Learning
          </h1>

          <h2 className="text-grey opacity-50 text-xl font-medium my-5">
            Get access to our database of 10,000+ unique <br /> revision
            questions and master your education today.
          </h2>
          <button
            className="group px-4 py-2 bg-gradient-to-r from-blue-300 to-cyan-400 rounded-full flex items-center text-white font-medium [text-shadow:_0_1px_5px_rgb(0_0_0_/_20%)] transition-all duration-500 ease-in-out hover:pr-5"
            onClick={() => {
              window.location.href = "/pricing";
            }}
          >
            Get Started
            <FontAwesomeIcon
              icon={faArrowRight}
              className="ml-2 text-white transition-transform duration-500 ease-in-out group-hover:translate-x-1"
            />
          </button>
        </div>

        <div className="w-full md:w-1/3 mt-8 md:mt-0">
          <img src={DoctorImage} alt="Doctor" className="w-full" />
        </div>
      </div>

      {/* Features */}
      <div className="flex flex-col mx-auto my-10 w-full text-white px-5 md:px-10">
        <h2 className="text-center text-cyan-400 font-bold mb-5">
          OUR FEATURES
        </h2>
        <div className="flex flex-col md:flex-row w-full gap-2">
          <div className="flex items-center justify-center flex-col w-full md:flex-1 p-8 mb-4 md:mb-0 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-lg">
            <div className="text-4xl font-bold">10+</div>
            <div className="text-xl">Courses</div>
          </div>
          <div className="flex items-center justify-center flex-col w-full md:flex-1 p-8 mb-4 md:mb-0 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-lg">
            <div className="text-4xl font-bold">20+</div>
            <div className="text-xl">Tutorials</div>
          </div>
          <div className="flex items-center justify-center flex-col w-full md:flex-1 p-8 mb-4 md:mb-0 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-lg">
            <div className="text-4xl font-bold">30+</div>
            <div className="text-xl">Tools</div>
          </div>
          <div className="flex items-center justify-center flex-col w-full md:flex-1 p-8 mb-4 md:mb-0 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-lg">
            <div className="text-4xl font-bold">40+</div>
            <div className="text-xl">Resources</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
