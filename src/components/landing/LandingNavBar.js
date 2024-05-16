import React, { useState, useEffect } from "react";
import Logo from "./drrevision.webp";
function LandingNavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect to add/remove scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      // Set isScrolled to true if scrolled more than 0, otherwise false
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array to set up on mount only

  return (
    <div className={`fixed px-2 lg:px-0 py-3 w-full top-0 left-0 right-0 z-50`}>
      <nav
        className={`text-white py-1 md:py-2 w-full rounded-full mx-auto max-w-6xl  ${
          isScrolled ? "shadow-lg bg-white" : ""
        }`}
      >
        <div className="mx-auto flex justify-between items-center px-5 text-cyan-400">
          <div className="flex items-center font-bold text-xl">
            <img alt="logo" src={Logo} className="w-8 mr-2 "/>
          Dr Revision

          </div>
          <div>
            {/* Use hidden to hide on small screens, and md:inline-flex or md:block to show on medium screens and up */}
            <a
              href="/sign-in"
              className="inline-flex m-0 md:mr-8 font-medium"
              onClick={() => {
                window.location.href = "/sign-in";
              }}
            >
              Sign in
            </a>

            <button
              className=" hidden md:inline-flex px-4 py-2 bg-gradient-to-r from-blue-300 to-cyan-400 rounded-full transition-colors duration-200 text-white font-medium [text-shadow:_0_1px_5px_rgb(0_0_0_/_20%)]"
              onClick={() => {
                window.location.href = "/register";
              }}
            >
              Get Started
            </button>
            {/* Add more navigation links as needed */}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default LandingNavBar;
