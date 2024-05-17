import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import navItems from "./NavItems";
import Logo from "./drrevision.webp";

const TopNavigation = ({ selectedNav, onNavChange }) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavItemClick = (itemName) => {
    onNavChange(itemName);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed mt-2 top-0 left-0 right-0 z-50 mx-2  bg-neutral-100 md:hidden block py-3 px-6 ${isMenuOpen ? "rounded-xl" : ""} ${!isMenuOpen ? "rounded-xl" : ""} ${hasScrolled ? "shadow-xl bg-white" : ""} `}>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
        <img alt="logo" src={Logo} className="w-8 mr-2 "/>

          <span className="text-xl font-bold text-cyan-400">Dr Revision</span>
        </div>
        <div>
          <button onClick={toggleMenu} aria-label="Open menu" className="text-xl">
            <FontAwesomeIcon icon={faBars} className="text-cyan-400" />
          </button>
        </div>
      </div>
      <div className={`overflow-hidden transition-all duration-700 ease-linear ${isMenuOpen ? "max-h-96" : "max-h-0"}`}>
        {navItems.map((item) => (
          <button key={item.name} className="flex items-center py-2 text-sm text-gray-700 w-full text-left" onClick={() => handleNavItemClick(item.name)}>
            <span className="w-6 mr-2 flex justify-center items-center">
              <FontAwesomeIcon icon={item.icon} />
            </span>
            {item.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default TopNavigation;
