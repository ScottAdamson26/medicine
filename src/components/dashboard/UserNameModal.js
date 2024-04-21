import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

const UserNameModal = ({ user, onClose }) => {
    const [name, setName] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const userRef = doc(db, 'users', user.uid);
      try {
        await updateDoc(userRef, {
          name: name, // Only update the name field
        });
        console.log("User name added to Firestore");
        onClose(name); // Pass the new name back to the Dashboard
      } catch (error) {
        console.error("Error updating user data: ", error.message);
      }
    };
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center">
      <div className="bg-gradient-to-r from-blue-300 to-cyan-400 p-1 rounded-xl shadow-xl">
        <div className="bg-white p-4 rounded-lg shadow-lg z-50 flex flex-col justify-center items-center">
          <h2 className="text-xl font-bold mb-4">
            Welcome! <span className="text-3xl">👋</span> What should we call you?
          </h2>
          <form onSubmit={handleSubmit} className="w-full flex">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-grow border rounded py-2 px-4 outline-none focus:border-cyan-400"
              placeholder="Your name"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-300 to-cyan-400 text-white rounded ml-3 px-4 py-2 hover:bg-blue-700 transition-colors duration-300 ease-in-out"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserNameModal;
