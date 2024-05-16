import React from "react";
import Logo from "./drrevision.webp";
const Footer = () => {
  return (
    <div className="w-full max-w-6xl flex  flex-col items-center justify-center h-full mb-28"> {/* Adjusted for full centering */}
            <img src={Logo} alt="Logo" className="h-12 mb-3" />{" "}
      <h1 className="text-grey opacity-20 font-semibold">Dr Revision Est. 2024</h1>
    </div>
  );
};

export default Footer;
