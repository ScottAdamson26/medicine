import React from "react";
import LandingNavBar from "./LandingNavBar";
import DashboardImage from "./dashboard3.webp";
import MobileImage from "./mobile.png";
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
import {
  faBolt,
  faBook,
  faChartSimple,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

function LandingPage2() {
  return (
    <div className="relative flex min-h-screen flex-col items-center px-2 pt-2">
      {/* Background layer */}
      <div
        className="absolute left-0 top-0 h-screen w-full bg-white"
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
      <div className="relative z-10 mx-auto flex h-screen w-full max-w-6xl flex-col justify-between overflow-hidden">
        <LandingNavBar />
  {/* Content Container */}
<div className="flex-grow flex flex-col justify-center items-center md:pt-10">
  <div className="text-center w-full mt-24">
    <button
      onClick={() => (window.location.href = "/register")}
      className="outline-dashed outline-1 text-xs font-semibold outline-red-500 rounded-full py-0.5 px-3 mb-5 text-red-500"
    >
      <FontAwesomeIcon icon={faCircle} beatFade className="mr-2" />
      BETA LIVE! GET 50% OFF NOW
    </button>

    <h1 className="text-4xl md:text-7xl font-bold text-zinc-800 md:text-balance">
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
      className="px-4 py-2 bg-gradient-to-r from-blue-300 to-cyan-400 rounded-full flex items-center text-white font-medium [text-shadow:_0_1px_5px_rgb(0_0_0_/_20%)] transition-all duration-500 ease-in-out hover:px-5 mx-auto mb-10"
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

{/* Image Section */}
<div className="relative h-full w-full flex justify-center">
  <img
    src={DashboardImage}
    alt="Dashboard"
    className="hidden sm:block rounded-tl-xl rounded-bl-xl sm:rounded-bl-none sm:rounded-tr-xl h-full object-cover object-left"
  />
  <img
    src={MobileImage}
    alt="Mobile"
    className="block sm:hidden h-full object-cover object-top mx-auto"
    style={{ maxWidth: "calc(100% - 6rem)" }} // Adjust this value as needed
  />
</div>


      </div>

      <div className="mb-20 flex items-center justify-center bg-white md:mt-20 ">
        <div className="w-full max-w-6xl">
          <div className="flex h-full flex-col md:flex-row">
            <div className="flex w-full flex-col justify-center p-10 md:w-1/2">
              <p className="inline-block bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-center text-6xl font-bold text-transparent md:text-left">
                Trust the experts
              </p>
              <p className="mt-5 text-center md:text-left">
                Our carefully curated questions have been written and reviewed
                by our team of doctors from the UK
              </p>
            </div>
            <div className="md-pr-10 flex w-full flex-col justify-center px-5 py-5 md:w-1/2 lg:px-0">
              <div className="grid grid-cols-2 grid-rows-2 gap-6 md:gap-8">
                <div className="col-span-1 row-span-1 flex flex-col items-center justify-center rounded-lg bg-white p-4 text-cyan-400 shadow outline outline-2 outline-cyan-400">
                  <p className="text-3xl font-bold md:text-4xl">4,000+</p>
                  <p className="font-bold">Questions</p>
                </div>
                <div className="col-span-1 row-span-1 flex flex-col items-center justify-center rounded-lg bg-gradient-to-r from-blue-300 to-cyan-400 p-4 text-white shadow">
                  <p className="text-4xl font-bold">4</p>
                  <p className="font-bold">Mock Exams</p>
                </div>
                <div className="col-span-2 row-span-1 flex items-center justify-between rounded-lg bg-neutral-50 bg-white bg-opacity-50 px-3 shadow outline outline-2 outline-cyan-400 lg:px-12">
                  <p className="lg: md-text-xl w-1/2 text-base font-bold text-cyan-400 md:text-lg">
                    All reviewed by doctors in the field
                  </p>
                  <div className="z-5 fixed relative -mt-6 h-auto w-52 overflow-hidden">
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

      <div className="flex w-full items-center justify-center px-5 md:px-10 lg:mx-0">
        <div className="mb-20 flex w-full max-w-6xl flex-col items-center justify-between rounded-xl bg-white px-5 py-7 shadow-custom-xl outline outline-2 outline-cyan-400 md:mb-28 md:flex-row md:px-16 md:py-10 lg:px-28">
          <div className="text-xs font-bold text-cyan-400">
            <p>WHAT OUR USERS SAY</p>
            <p className="mt-2 text-balance text-2xl font-semibold">
              "Studying doesn't have to be boring. Dr Revision is fun to use and
              makes revising less of a chore."
            </p>
            <p className="mt-2 text-xs text-neutral-300">
              - DAVID GRINGRAS, 5th YEAR MEDICAL STUDENT
            </p>
          </div>
          <div className="mt-8 h-48 w-48 flex-shrink-0 overflow-hidden rounded-full bg-white p-1 outline outline-dashed outline-cyan-400 md:mt-0">
            <img
              src={David}
              alt="David"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="text-grey mb-20 flex w-full items-center justify-center px-10 text-5xl opacity-10 md:mb-28 md:px-28">
        <div className="flex w-full max-w-6xl items-center justify-between">
          <FontAwesomeIcon icon={faRedditAlien} className="md:ml-16" />
          <FontAwesomeIcon icon={faXTwitter} className="" />
          <FontAwesomeIcon icon={faGoogle} className="" />
          <FontAwesomeIcon icon={faYoutube} className="md:mr-16" />
        </div>
      </div>

      <div className="mb-28 flex max-w-6xl flex-col items-center justify-center bg-white px-5 text-zinc-800 md:px-5">
        <h1 className="mb-20 text-center text-lg font-bold text-cyan-400">
          PERKS{" "}
        </h1>
        <div className="grid w-full grid-rows-3 gap-10 lg:grid-cols-3 lg:grid-rows-1 lg:gap-20">
          <div className="font-base flex flex-col items-center justify-center text-balance rounded-lg px-10 py-28 shadow-custom-lg outline outline-1 outline-cyan-400">
            <div className="mb-10 flex h-16 w-16 items-center justify-center  rounded-lg bg-green-200 bg-gradient-to-r from-green-300 to-lime-300 shadow-custom-lg">
              <FontAwesomeIcon
                icon={faChartSimple}
                className="text-3xl text-white"
              />
            </div>
            <p className="text-grey text-center font-semibold opacity-40">
              Detailed stats tracking{" "}
            </p>
          </div>
          <div className="font-base flex flex-col items-center justify-center text-balance rounded-lg px-10 py-28 shadow-custom-lg outline outline-1 outline-cyan-400">
            <div className="mb-10 flex h-16 w-16 items-center justify-center  rounded-lg bg-gradient-to-r from-orange-300 to-rose-300 shadow-custom-lg">
              <FontAwesomeIcon
                icon={faGraduationCap}
                className="text-3xl text-white"
              />
            </div>
            <p className=" text-grey text-center font-semibold opacity-40">
              4 timed mock exam papers{" "}
            </p>
          </div>
          <div className="font-base flex flex-col items-center justify-center text-balance rounded-lg px-10 py-28 shadow-custom-lg outline outline-1 outline-cyan-400 lg:px-5">
            <div className="mb-10 flex h-16 w-16 items-center justify-center  rounded-lg bg-gradient-to-r from-purple-200 to-fuchsia-300 shadow-custom-lg">
              <FontAwesomeIcon icon={faBook} className="text-3xl text-white" />
            </div>
            <p className="text-grey text-center font-semibold opacity-40">
              Access to our 4000+ AKT question bank
            </p>
          </div>
        </div>
      </div>
      <div className=" mb-28 flex w-full flex-col items-center justify-center bg-white text-zinc-800">
        <h1 className="mb-20 text-center text-lg font-bold text-cyan-400">
          PRICING
        </h1>

        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-16 md:grid-cols-2 lg:gap-20">
          {/* Tier 1 - Free Plan */}
          <div className="mx-5 rounded-xl bg-gradient-to-r from-blue-300 to-cyan-400 p-1 shadow-md md:mx-0 md:ml-10">
            <div className="flex h-full w-full flex-col rounded-lg bg-white px-8 py-20 md:px-12">
              <h2 className="mb-4 text-xl font-bold">Free Trial</h2>
              <div className="mb-4 flex flex-row items-end ">
                {" "}
                <h2 className=" mr-1 text-4xl font-semibold ">£0</h2>
                <p className="opacity-60">/ month</p>
              </div>

              <ul className="mb-4">
                <li>✔ 20 trial questions</li>
                <li className="opacity-30">✗ 4 Mock Exams</li>
                <li className="opacity-30">✗ Pomodoro Study Timer</li>
              </ul>
              <button
                onClick={() => {
                  window.location.href = "/register";
                }}
                className="flex items-center justify-center rounded bg-gradient-to-r from-blue-300 to-cyan-400 px-4 py-2 font-medium text-white"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Tier 2 - Pro Plan (Most Popular) */}
          <div className="relative mx-5 rounded-b-xl bg-gradient-to-r from-blue-300 to-cyan-400 p-1 shadow-md md:mx-0 md:mr-10">
            <div className="absolute -top-7 left-1/2 inline-flex w-full -translate-x-1/2 transform items-center justify-center rounded-t-xl bg-blue-500 bg-gradient-to-r from-blue-300 to-cyan-400 py-1 text-sm text-white">
              Most Popular
            </div>
            <div className="flex w-full flex-col rounded-b-lg bg-white px-8 py-20 md:px-12">
              <div>
                <button className="mb-4 inline rounded-full px-3 py-0.5 text-xs font-semibold text-red-500 outline-dashed outline-1 outline-red-500 md:hidden">
                  <FontAwesomeIcon icon={faCircle} beatFade className="mr-2" />
                  50% OFF!
                </button>
              </div>
              <div className="mb-4 flex flex-row items-center ">
                {" "}
                <h2 className="text-xl font-bold">Pro Bundle</h2>
                <FontAwesomeIcon
                  icon={faBolt}
                  className="ml-2 text-yellow-400"
                />
                <button className=" ml-2 flex hidden items-center rounded-full px-3 py-0.5 text-xs font-semibold text-red-500 outline-dashed outline-1 outline-red-500 md:inline">
                  <FontAwesomeIcon
                    icon={faCircle}
                    beatFade
                    className="tra mr-2 align-middle"
                  />
                  50% OFF!
                </button>
              </div>

              <div className="mb-4 mr-1 flex flex-row items-end">
                {" "}
                <h2 className=" text-4xl font-semibold ">£7.98</h2>
                <p className="opacity-60">/ month</p>
              </div>

              <ul className="mb-4">
                <li>✔ 4,000+ Questions</li>
                <li>✔ 4 Mock Exams</li>
                <li>✔ Pomodoro Study Timer</li>
              </ul>
              <button
                onClick={() => {
                  window.location.href = "/register";
                }}
                className="flex items-center justify-center rounded bg-gradient-to-r from-blue-300 to-cyan-400 px-4 py-2 font-medium text-white"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage2;
