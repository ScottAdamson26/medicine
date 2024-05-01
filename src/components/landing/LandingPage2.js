import React from "react";
import LandingNavBar from "./LandingNavBar";
import DoctorImage from "./dashboard3.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircle } from "@fortawesome/free-solid-svg-icons";
import {
  faRedditAlien,
  faYoutube,
  faGoogle,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Doctors from "./doctors.png";
import David from "./david.png";
import Footer from "./Footer";
function LandingPage2() {
  return (
    <div className="flex flex-col min-h-screen pt-2 px-2 relative">
      {/* Background layer */}
      <div
        className="absolute top-0 left-0 w-full h-screen bg-white"
        style={{
          backgroundColor: "#ffffff",
          opacity: 0.3,
          backgroundSize: "110px 110px, 110px 110px, 22px 22px, 22px 22px",
          backgroundImage:
            "linear-gradient(#f4f4f4 4.4px, transparent 4.4px), linear-gradient(90deg, #f4f4f4 4.4px, transparent 4.4px), linear-gradient(#f4f4f4 2.2px, transparent 2.2px), linear-gradient(90deg, #f4f4f4 2.2px, #ffffff 2.2px)",
          backgroundPosition:
            "-4.4px -4.4px, -4.4px -4.4px, -2.2px -2.2px, -2.2px -2.2px",
          zIndex: 0,
        }}
      />

      {/* Constrained Main Content */}
      <div className="mx-auto max-w-6xl w-full relative z-10 flex flex-col justify-between h-screen">
        <LandingNavBar />

        {/* Content Container */}
        <div className="flex-grow flex flex-col justify-center items-center md:px-10">
          <div className="text-center w-full lg:mt-10">
            <button
              onClick={() => (window.location.href = "/register")}
              className="outline-dashed outline-1 text-xs font-semibold outline-red-500 rounded-full py-0.5 px-3 mb-5 text-red-500"
            >
              <FontAwesomeIcon icon={faCircle} beatFade className="mr-2" />
              BETA LIVE! GET 50% OFF NOW
            </button>

            <h1 className="text-4xl md:text-7xl font-bold text-zinc-800">
              The Ultimate{" "}
              <span className="bg-gradient-to-r ml-4 md:ml-0 from-blue-300 to-cyan-400 inline-block text-transparent bg-clip-text">
                UKMLA
              </span>{" "}
              Learning Platform
            </h1>

            <h2 className="text-grey opacity-50 mx-auto max-w-2xl text-lg md:text-xl font-medium my-5">
              Get ahead of the game with access to our database of 4,000+ unique
              revision questions and master medicine today.
            </h2>

            <button
              className="px-4 py-2 bg-gradient-to-r from-blue-300 to-cyan-400 rounded-full flex items-center text-white font-medium [text-shadow:_0_1px_5px_rgb(0_0_0_/_20%)] transition-all duration-500 ease-in-out hover:px-5 mx-auto"
              onClick={() => (window.location.href = "/register")}
            >
              Get Started
              <FontAwesomeIcon
                icon={faArrowRight}
                className="ml-2 text-white transition-transform duration-500 ease-in-out group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>

        {/* Image positioned at the bottom */}
        <div className="w-full">
          <img
            src={DoctorImage}
            alt="Doctor"
            className="w-full h-auto rounded-t-xl"
            style={{ display: "block" }}
          />
        </div>
      </div>

      <div className="flex items-center justify-center bg-white my-20 md:my-32">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col md:flex-row h-full">
            {" "}
            {/* Ensure full height usage and center alignment */}
            <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
              {" "}
              {/* Center content vertically */}
              {/* Content for the first half */}
              <p className="bg-gradient-to-r from-blue-300 to-cyan-400 text-center md:text-left inline-block text-transparent bg-clip-text text-6xl font-bold ">
                Trust the experts
              </p>
              <p className="mt-5 text-center md:text-left">
                Our carefully curated questions have been written and reviewed
                by our team of doctors from the UK
              </p>
            </div>
            <div className="w-full md:w-1/2 px-5 md-pr-10 lg:px-0 py-5 flex flex-col justify-center">
              {" "}
              {/* Center content vertically */}
              {/* Content for the second half */}
              <div className="grid grid-cols-2 grid-rows-2 gap-6 md:gap-8">
                <div className="col-span-1 outline outline-2 flex flex-col items-center justify-center text-cyan-400 outline-cyan-400 row-span-1 bg-white rounded-lg shadow p-4">
                  {/* First box content */}
                  <p className="font-bold text-3xl md:text-4xl">4,000+</p>
                  <p className="font-bold">Questions</p>
                </div>
                <div className="col-span-1 row-span-1 flex flex-col items-center justify-center bg-gradient-to-r from-blue-300 to-cyan-400 text-white rounded-lg shadow p-4">
                  {/* Second box content */}
                  <p className="font-bold text-4xl">24</p>
                  <p className="font-bold">Topics</p>
                </div>
                <div className="col-span-2 row-span-1 bg-neutral-50 bg-opacity-50 flex justify-between items-center bg-white rounded-lg shadow px-3 lg:px-12 outline outline-2 outline-cyan-400">
                  {/* Rectangle content */}
                  <p className="text-cyan-400 text-base md:text-lg lg: md-text-xl font-bold w-1/2">
                    All reviewed by doctors in the field
                  </p>
                  <div className="overflow-hidden h-auto w-52 -mt-6 relative z-5">
                    <img
                      src={Doctors}
                      alt="Doctors"
                      className="h-auto w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full px-5 md:px-10 lg:mx-0">
        <div className="flex flex-col md:flex-row items-center shadow-custom-xl mb-20 md:mb-28 justify-between w-full max-w-6xl bg-white outline outline-2 outline-cyan-400 rounded-xl py-7 md:py-10 px-5 md:px-16 lg:px-28">
          <div className="text-cyan-400 text-xs font-bold">
            <p>WHAT OUR USERS SAY</p>
            <p className="mt-2 font-semibold text-balance text-2xl">
              "Studying doesn't have to be boring. MedMaster is fun to use and
              makes revising less of a chore."
            </p>
            <p className="text-xs text-neutral-300 mt-2">
              - DAVID GRINGRAS, 5th YEAR MEDICAL STUDENT
            </p>
          </div>
          <div className="flex-shrink-0 h-48 w-48 rounded-full overflow-hidden bg-white outline outline-dashed outline-cyan-400 p-1 mt-8 md:mt-0">
            <img
              src={David}
              alt="David"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center text-5xl text-grey opacity-10 justify-center w-full mb-20 md:mb-28 px-10 md:px-28">
        <div className="flex justify-between items-center w-full max-w-6xl">
          <FontAwesomeIcon icon={faRedditAlien} className="md:ml-16" />
          <FontAwesomeIcon icon={faXTwitter} className="" />
          <FontAwesomeIcon icon={faGoogle} className="" />
          <FontAwesomeIcon icon={faYoutube} className="md:mr-16" />
        </div>
      </div>

      <div className=" flex flex-col justify-center items-center bg-white text-zinc-800 md:px-5 mb-28">
      <h1 className="text-lg font-bold text-cyan-400 text-center mb-20">PRICING</h1>

      <div className="w-full px-5 md:px-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Tier 1 - Free Plan */}
        <div className="bg-gradient-to-r from-blue-300 to-cyan-400 shadow-md rounded-xl p-1">
          <div className="bg-white rounded-lg flex flex-col w-full h-full p-8">
            <h2 className="text-xl font-bold mb-4">Free Plan</h2>
            <ul className="mb-4">
              <li>✔ 20 trial questions</li>
              <li className="opacity-30">✗ 4 Mock Exams</li>
              <li className="opacity-30">✗ Pomodoro Study Timer</li>
            </ul>
            <button
              className="bg-gradient-to-r from-blue-300 to-cyan-400 text-white px-4 py-2 rounded font-medium flex justify-center items-center"

            >

                Register
            </button>
          </div>
        </div>

        {/* Tier 2 - Pro Plan (Most Popular) */}
        <div className="relative bg-gradient-to-r from-blue-300 to-cyan-400 shadow-md rounded-b-xl p-1 md-0">
          <div className="bg-gradient-to-r from-blue-300 to-cyan-400 absolute -top-7 left-1/2 transform -translate-x-1/2 bg-blue-500 py-1 text-sm text-white rounded-t-xl inline-flex items-center justify-center w-full">
            Most Popular
          </div>
          <div className="bg-white rounded-b-lg flex flex-col w-full h-full p-8">
            <h2 className="text-xl font-bold mb-4">Pro Plan</h2>
            <ul className="mb-4">
              <li>✔ 4,000+ Questions</li>
              <li>✔ 4 Mock Exams</li>
              <li>✔ Pomodoro Study Timer</li>

            </ul>
            <button
              className="bg-gradient-to-r from-blue-300 to-cyan-400 text-white px-4 py-2 rounded font-medium flex justify-center items-center"
            >
         
                Register
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    
      
    </div>
  );
}

export default LandingPage2;
