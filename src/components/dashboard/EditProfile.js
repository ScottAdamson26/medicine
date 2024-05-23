import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import Lottie from "react-lottie";
import spinnerAnimation from "./spinner.json";
import profilePic1 from "./profilepic.webp";
import profilePic2 from "./profilepic2.webp";
import profilePic3 from "./profilepic3.webp";

const EditProfile = ({ onClose }) => {
  const {
    currentUser,
    name,
    SetName,
    profilePictureIndex,
    updateProfilePictureIndex,
  } = useAuth();
  const [inputName, setInputName] = useState(name);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [selectedPicIndex, setSelectedPicIndex] = useState(profilePictureIndex);

  const profilePics = [profilePic1, profilePic2, profilePic3];

  useEffect(() => {
    setSelectedPicIndex(profilePictureIndex);
  }, [profilePictureIndex]);

  const handleInputChange = (event) => {
    setInputName(event.target.value);
    setError("");
  };

  const handleSave = async () => {
    if (currentUser) {
      setIsSaving(true);
      setError("");
      try {
        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, {
          name: inputName,
          profilePicture: selectedPicIndex,
        });
        SetName(inputName);
        updateProfilePictureIndex(selectedPicIndex);
        onClose();
      } catch (error) {
        console.error("Failed to update profile:", error);
        setError("Failed to update profile.");
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
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative m-3 rounded-xl bg-gradient-to-r from-purple-200 to-fuchsia-300 p-1 shadow-xl min-w-96">
        <div className="flex flex-col rounded-lg bg-white p-8 shadow-lg">
          <button
            onClick={onClose}
            className="absolute left-3 top-2 text-lg text-gray-300 transition-colors duration-200 hover:text-gray-500"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <div className="max-w-xs">
          <h1 className="text-xl font-bold">Profile</h1>
          <h2 className="opacity-30 font-semibold text-base"> Make changes to your profile </h2>
            <h1 className="text-xl font-bold">Name</h1>
            <input
              type="text"
              value={inputName}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-md border-2 border-purple-200 bg-gray-50 px-3 py-1 text-lg font-medium focus:border-purple-200 focus:outline-none focus:ring-0"
            />
            {error && <div className="mt-1 text-xs text-red-500">{error}</div>}
            <h1 className="mt-6 text-xl font-bold">Profile Picture</h1>
            <div className="mt-2 flex justify-center space-x-4">
              {profilePics.map((pic, index) => (
                <div
                  key={index}
                  className={`cursor-pointer rounded-full border-4 ${selectedPicIndex === index ? "border-purple-400" : "border-transparent"}`}
                  onClick={() => handlePicSelect(index)}
                >
                  <img
                    src={pic}
                    alt={`Profile Pic ${index + 1}`}
                    className="h-16 w-16 rounded-full"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={handleSave}
              className="text-md mt-4 w-full rounded bg-gradient-to-r from-purple-300 to-fuchsia-300 px-4 py-1 font-bold text-white transition-all duration-300 ease-in-out hover:from-purple-400 hover:to-fuchsia-400"
              disabled={isSaving || !inputName}
            >
              {isSaving ? (
                <Lottie options={defaultOptions} height={30} width={30} />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
