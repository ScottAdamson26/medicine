import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useAuth } from "../../AuthContext";
import profilePic1 from "./profilepic.webp";
import profilePic2 from "./profilepic2.webp";
import profilePic3 from "./profilepic3.webp";

const UserNameModal = ({ user, onClose }) => {
  const [name, setName] = useState("");
  const [selectedPicIndex, setSelectedPicIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const { SetName: updateContextName, updateProfilePictureIndex } = useAuth();

  const profilePics = [profilePic1, profilePic2, profilePic3];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userRef = doc(db, "users", user.uid);
    try {
      setIsSaving(true);
      await updateDoc(userRef, {
        name: name,
        profilePicture: selectedPicIndex,
      });
      updateContextName(name);
      updateProfilePictureIndex(selectedPicIndex);
      onClose(name); // Pass the new name back to the Dashboard
    } catch (error) {
      console.error("Error updating user data: ", error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePicSelect = (index) => {
    setSelectedPicIndex(index);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="m-2 rounded-xl bg-gradient-to-r from-blue-300 to-cyan-400 p-1 shadow-xl">
        <div className="z-50 flex flex-col items-center justify-center rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-4 w-full text-left text-xl font-bold">
            Welcome! <span className="text-3xl">👋</span> What should we call
            you?
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-start"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-4 w-full rounded border px-4 py-2 outline-none focus:border-cyan-400"
              placeholder="Your name"
              required
            />
            <h1 className="w-full text-left text-xl font-bold">
              Which profile picture suits you best?
            </h1>
            <div className="mt-2 flex justify-start space-x-4">
              {profilePics.map((pic, index) => (
                <div
                  key={index}
                  className={`cursor-pointer rounded-full border-4 ${selectedPicIndex === index ? "border-cyan-400" : "border-transparent"}`}
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
              type="submit"
              className="mt-4 w-full rounded bg-gradient-to-r from-blue-300 to-cyan-400 py-2 font-bold text-white transition-all duration-300 ease-in-out hover:from-blue-400 hover:to-cyan-400"
              disabled={isSaving || !name}
            >
              {isSaving ? (
                <div className="flex items-center justify-center">
                  <div className="spinner-border inline-block h-4 w-4 animate-spin rounded-full border-4 text-white"></div>
                  <span className="ml-2">Saving...</span>
                </div>
              ) : (
                "Save"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserNameModal;
