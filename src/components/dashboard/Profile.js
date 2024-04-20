import React from "react";
import ProfilePic from "./profilepic.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

const Profile = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-white rounded-xl shadow-lg py-8 mb-4">
      <img src={ProfilePic} alt="Profile" className="w-20 h-20 rounded-full" />
      <h1 className="text-xl font-bold text-zinc-900 mt-4">{name}</h1>

      <div className="flex text-sm items-center">
        <p className="text-zinc-900 opacity-65 mr-2">Basic Plan</p>
        <FontAwesomeIcon icon={faBolt} className="text-yellow-400"/>
      </div>
      
      <div className="flex mt-4 w-full xl:w-2/3 border-t pt-4 px-3">
        <div className="flex-1 text-center">
          <p className="font-bold text-lg">150</p>
          <p className="text-zinc-900 opacity-65 text-sm">questions</p>
        </div>
        <div className="flex-1 border-l border-r border-gray-300 text-center">
          <p className="font-bold text-lg">104</p>
          <p className="text-zinc-900 opacity-65 text-sm">correct</p>
        </div>
        <div className="flex-1 text-center">
          <p className="font-bold text-lg">12</p>
          <p className="text-zinc-900 opacity-65 text-sm">topics</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
