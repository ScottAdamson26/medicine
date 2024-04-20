import React from 'react';

function LandingNavBar() {
  return (
    <nav className="bg-white text-white py-4 w-full rounded-full">
      <div className="mx-auto flex justify-between items-center px-6 text-cyan-400">
        <div className="font-bold text-xl">Medicine</div>
        <div>
          {/* Use hidden to hide on small screens, and md:inline-flex or md:block to show on medium screens and up */}
          <a href="/sign-in" className="hidden md:inline-flex px-4 font-medium" onClick={() => {window.location.href = '/sign-in';}}>Sign in</a>

          <button 
            className="px-4 py-2 bg-gradient-to-r from-blue-300 to-cyan-400 rounded-full transition-colors duration-200 text-white font-medium [text-shadow:_0_1px_5px_rgb(0_0_0_/_20%)]"
            onClick={() => {window.location.href = '/register';}}>Get Started</button>
          {/* Add more navigation links as needed */}
        </div>
      </div>
    </nav>
  );
}

export default LandingNavBar;
