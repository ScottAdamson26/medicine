import React from "react";
import { Link } from "react-router-dom";
import Logo from "./drrevision.webp";

const Footer = () => {
  return (
    <div className="w-full max-w-6xl flex flex-col text-regular items-center justify-center h-full mb-28"> {/* Adjusted for full centering */}
      <img src={Logo} alt="Logo" className="h-12 mb-3" />
      <h1 className="text-grey opacity-20 font-semibold">
        © 2024 Dr Revision. All rights reserved
        
      </h1>
      <div className="text-grey opacity-20 font-medium"> <Link to="/privacy" className=" underline">
          Privacy Policy
        </Link> |{" "}
        <Link to="/tos" className="underline">
          Terms of Service
        </Link></div>
     
      <p className="text-grey opacity-20 font-medium">
        support@drrevision.com
      </p>
    </div>
  );
};

export default Footer;
