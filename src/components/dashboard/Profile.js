import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faPenToSquare,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../AuthContext";
import EditProfile from "./EditProfile";
import profilePic1 from "./profilepic.webp";
import profilePic2 from "./profilepic2.webp";
import profilePic3 from "./profilepic3.webp";

const Profile = ({ topics }) => {
  const { planName, name, profilePictureIndex } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalTopics, setTotalTopics] = useState(0);

  const profilePics = [profilePic1, profilePic2, profilePic3];

  const toggleEdit = () => setIsEditing(!isEditing);

  useEffect(() => {
    const calculateStats = () => {
      if (topics && topics.length > 0) {
        const totalQuestions = topics.reduce(
          (acc, topic) => acc + (topic.attempts || 0),
          0,
        );
        const totalCorrect = topics.reduce(
          (acc, topic) => acc + (topic.correct || 0),
          0,
        );
        const totalTopics = topics.filter((topic) => topic.attempts > 0).length;

        setTotalQuestions(totalQuestions);
        setTotalCorrect(totalCorrect);
        setTotalTopics(totalTopics);
      }
    };

    calculateStats();
  }, [topics]);

  // Fake data for Free Plan
  const fakeData = {
    totalQuestions: 100,
    totalCorrect: 50,
    totalTopics: 10,
  };

  return (
    <div className="relative mb-4 flex w-full flex-col items-center justify-center rounded-xl bg-white py-8 shadow-lg">
      <button
        onClick={toggleEdit}
        className="absolute left-4 top-4 text-xs text-gray-300 transition-colors duration-200 hover:text-gray-400"
        aria-label="Edit Profile"
      >
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>

      {isEditing && <EditProfile onClose={toggleEdit} />}

      <img
        src={profilePics[profilePictureIndex]}
        alt="Profile"
        className="h-20 w-20 rounded-full"
      />
      <h1 className="mt-4 text-xl font-bold text-zinc-900">{name}</h1>

      <div className="flex items-center text-sm">
        <p className="mr-2 text-zinc-900 opacity-65">{planName}</p>
        <FontAwesomeIcon icon={faBolt} className="text-yellow-400" />
      </div>

      <div className="relative mt-4 flex w-full border-t px-8 pt-4">
        {planName === "Free Plan" && (
          <div className="absolute inset-0 z-20 flex items-center justify-center rounded-lg bg-white bg-opacity-70 backdrop-blur-sm">
            <div className="flex items-center text-sm">
              <FontAwesomeIcon icon={faLock} className="mr-2 text-gray-500" />
              <p className="ml-1 text-gray-500">Upgrade to unlock</p>
            </div>
          </div>
        )}

        <div className="flex-1 text-center">
          <p className="text-lg font-bold">
            {planName === "Free Plan"
              ? fakeData.totalQuestions
              : totalQuestions}
          </p>
          <p className="text-sm text-zinc-900 opacity-65">questions</p>
        </div>
        <div className="flex-1 border-l border-r border-gray-300 text-center">
          <p className="text-lg font-bold">
            {planName === "Free Plan" ? fakeData.totalCorrect : totalCorrect}
          </p>
          <p className="text-sm text-zinc-900 opacity-65">correct</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-lg font-bold">
            {planName === "Free Plan" ? fakeData.totalTopics : totalTopics}
          </p>
          <p className="text-sm text-zinc-900 opacity-65">topics</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
