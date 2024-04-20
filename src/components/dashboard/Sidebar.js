import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import navItems from './NavItems'; // Ensure this imports the nav items correctly

const Sidebar = ({ selectedNav, onNavChange }) => {
  // Filter out the main nav items and the bottom nav items
  const mainNavItems = navItems.filter(item => item.name !== "Settings" && item.name !== "Support");
  const bottomNavItems = navItems.filter(item => item.name === "Settings" || item.name === "Support");

  return (
    <div className="sticky hidden md:block top-0 h-screen p-8 bg-neutral-100 z-10">
      <div className="flex flex-col w-60 h-full rounded-2xl bg-white sticky top-0 md:top-8 overflow-auto shadow-lg">
        <div className="flex flex-col flex-grow">
          <div className="font-bold py-16 text-cyan-400 flex flex-col items-center">
            <div className="rounded-xl shadow-lg mb-3 bg-gradient-to-r from-blue-300 to-cyan-400 h-16 w-16"></div>
            <h1 className="text-xl">Medicine</h1>
            <h2 className="font-medium text-md opacity-70">Master your studies</h2>
          </div>
          <nav className="flex flex-col w-full flex-grow">
            {mainNavItems.map((item) => (
              <button
                key={item.name}
                onClick={() => onNavChange(item.name)}
                className={`py-4 pl-8 pr-4 text-sm font-semibold ${selectedNav === item.name ? 'text-white bg-gradient-to-r from-cyan-400 to-transparent' : 'text-gray-400'} flex items-center w-full text-left gap-x-2`}
              >
                <FontAwesomeIcon icon={item.icon} className="text-current w-4 h-4" />
                {item.name}
              </button>
            ))}
          </nav>
          {/* Section for settings and support */}
          <div className="mt-auto mb-4 text-sm">
            {bottomNavItems.map((item) => (
              <button
                key={item.name}
                onClick={() => onNavChange(item.name)}
                className={`py-4 pl-8 pr-4 text-md font-semibold opacity-65 ${selectedNav === item.name ? 'text-white bg-gradient-to-r from-cyan-400 to-transparent' : 'text-gray-400'} flex items-center w-full text-left gap-x-2`}
              >
                <FontAwesomeIcon icon={item.icon} className="text-current w-4 h-4" />
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
