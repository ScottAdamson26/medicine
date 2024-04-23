import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../AuthContext"; // Corrected the import path as necessary
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import Lottie from "react-lottie";
import spinnerAnimation from "./spinner.json";
import profilePic1 from "./profilepic.webp";
import profilePic2 from "./profilepic2.webp";
import profilePic3 from "./profilepic3.webp";

const EditProfile = ({ onClose }) => {
  const { currentUser, name, SetName } = useAuth();
  const [inputName, setInputName] = useState(name);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [selectedPicIndex, setSelectedPicIndex] = useState(0); // Default selected pic index
  const profilePics = [profilePic1, profilePic2, profilePic3]; // Array of profile picture sources

  const handleInputChange = (event) => {
    setInputName(event.target.value);
    setError("");
  };

  const handleSave = async () => {
    if (inputName !== name && currentUser) {
      setIsSaving(true);
      setError("");
      try {
        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, { name: inputName });
        SetName(inputName);
        onClose();
      } catch (error) {
        console.error("Failed to update name:", error);
        setError("Failed to update name.");
        setIsSaving(false);
      }
    }
  };

  const handlePicSelect = (index) => {
    setSelectedPicIndex(index);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: spinnerAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center">
      <div className="bg-gradient-to-r from-purple-200 to-fuchsia-300 p-1 rounded-xl shadow-xl relative m-3">
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col">
          <button onClick={onClose} className="absolute top-2 left-3 text-gray-300 text-lg hover:text-gray-500 transition-colors duration-200">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <div className="max-w-xs">
            <h1 className="text-xl font-bold">Name</h1>
            <input
              type="text"
              value={inputName}
              onChange={handleInputChange}
              className="w-full px-3 py-1 font-medium text-lg bg-gray-50 rounded-md mt-2 border-2 border-purple-200 focus:border-purple-200 focus:outline-none focus:ring-0"
            />
            {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
            <h1 className="text-xl font-bold mt-6">Profile Picture</h1>
            <div className="flex mt-2 justify-center space-x-4">
              {profilePics.map((pic, index) => (
                <div key={index} className={`cursor-pointer rounded-full border-4 ${selectedPicIndex === index ? 'border-purple-400' : 'border-transparent'}`}
                  onClick={() => handlePicSelect(index)}>
                  <img src={pic} alt={`Profile Pic ${index + 1}`} className="w-16 h-16 rounded-full"/>
                </div>
              ))}
            </div>
            <button
              onClick={handleSave}
              className="mt-4 bg-gradient-to-r from-purple-300 to-fuchsia-300 w-full text-white font-bold py-1 text-md px-4 rounded transition-all duration-300 ease-in-out hover:from-purple-400 hover:to-fuchsia-400"
              disabled={isSaving || !inputName}
            >
              {isSaving ? <Lottie options={defaultOptions} height={30} width={30} /> : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
