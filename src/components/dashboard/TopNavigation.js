import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import navItems from "./NavItems";

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
    <nav className={`sticky top-1 mx-2 z-50 bg-neutral-100 md:hidden block py-4 px-6 ${hasScrolled ? "shadow-xl rounded-lg" : ""}`}>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xl font-bold text-cyan-400">Medicine</span>
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
