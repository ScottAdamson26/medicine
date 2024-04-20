import React from "react";
import Doctor from "./doctorsim.png";

const Welcome = ({ name }) => {
    const welcomeMessage = name ? `Welcome back, ${name}` : "Welcome to Medicine!";

    return (
        <div className="relative w-full rounded-lg">
            <div className="mt-8 px-8 xl:px-16 shadow-lg text-2xl xl:text-4xl rounded-lg shadow bg-gradient-to-r from-blue-300 to-cyan-400 text-white flex justify-between items-center relative z-10">
                <span>{welcomeMessage}</span>
                <div className="overflow-hidden h-auto w-36 -mt-8 relative z-20">
                    <img src={Doctor} alt="Doctor" className="h-auto w-full" />
                </div>
            </div>
        </div>
    );
};

export default Welcome;
