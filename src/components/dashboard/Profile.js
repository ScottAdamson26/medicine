import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../AuthContext";
import EditProfile from "./EditProfile";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import profilePic1 from "./profilepic.webp";
import profilePic2 from "./profilepic2.webp";
import profilePic3 from "./profilepic3.webp";

const Profile = ({ topics }) => {
  const { planName, currentUser, name, profilePictureIndex, setProfilePictureIndex } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalTopics, setTotalTopics] = useState(0);

  const profilePics = [profilePic1, profilePic2, profilePic3];

  const toggleEdit = () => setIsEditing(!isEditing);

  useEffect(() => {
    const calculateStats = () => {
      if (topics && topics.length > 0) {
        const totalQuestions = topics.reduce((acc, topic) => acc + (topic.attempts || 0), 0);
        const totalCorrect = topics.reduce((acc, topic) => acc + (topic.correct || 0), 0);
        const totalTopics = topics.filter(topic => topic.attempts > 0).length;

        setTotalQuestions(totalQuestions);
        setTotalCorrect(totalCorrect);
        setTotalTopics(totalTopics);
      }
    };

    calculateStats();
  }, [topics]);

  useEffect(() => {
    const fetchUserProfilePicture = async () => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          const profilePictureIndex = userSnapshot.data().profilePicture;
          if (profilePictureIndex !== undefined) {
            setProfilePictureIndex(profilePictureIndex);
          }
        }
      }
    };

    fetchUserProfilePicture();
  }, [currentUser, setProfilePictureIndex]);

  return (
    <div className="flex flex-col items-center justify-center w-full bg-white rounded-xl shadow-lg py-8 mb-4 relative">
      <button
        onClick={toggleEdit}
        className="absolute top-4 left-4 text-gray-300 hover:text-gray-400 text-xs transition-colors duration-200"
        aria-label="Edit Profile"
      >
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>

      {isEditing && <EditProfile onClose={toggleEdit} />}

      <img src={profilePics[profilePictureIndex]} alt="Profile" className="w-20 h-20 rounded-full" />
      <h1 className="text-xl font-bold text-zinc-900 mt-4">{name}</h1>

      <div className="flex text-sm items-center">
        <p className="text-zinc-900 opacity-65 mr-2">{planName}</p>
        <FontAwesomeIcon icon={faBolt} className="text-yellow-400" />
      </div>

      <div className="flex mt-4 w-full xl:w-2/3 border-t pt-4 px-3">
        <div className="flex-1 text-center">
          <p className="font-bold text-lg">{totalQuestions}</p>
          <p className="text-zinc-900 opacity-65 text-sm">questions</p>
        </div>
        <div className="flex-1 border-l border-r border-gray-300 text-center">
          <p className="font-bold text-lg">{totalCorrect}</p>
          <p className="text-zinc-900 opacity-65 text-sm">correct</p>
        </div>
        <div className="flex-1 text-center">
          <p className="font-bold text-lg">{totalTopics}</p>
          <p className="text-zinc-900 opacity-65 text-sm">topics</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
