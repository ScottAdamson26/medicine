import React, { useState } from "react";
import Checkbox from "./Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Quizzes = ({ topics, isTruncated }) => {
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("All"); // New state for tracking the selected filter

  const toggleSelectAll = (isChecked) => {
    if (isChecked) {
      setSelectedQuizzes(topics.map((topic) => topic.id));
    } else {
      setSelectedQuizzes([]);
    }
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleSelectQuiz = (id) => {
    if (selectedQuizzes.includes(id)) {
      setSelectedQuizzes(selectedQuizzes.filter((quizId) => quizId !== id));
    } else {
      setSelectedQuizzes([...selectedQuizzes, id]);
    }
  };

  const isAllSelected = selectedQuizzes.length === topics.length;

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const filteredTopics = () => {
    switch (currentFilter) {
      case "Uncompleted":
        return topics.filter(
          (topic) => topic.totalQuestions - topic.correct - topic.incorrect > 0
        );
      case "Completed":
        return topics.filter(
          (topic) =>
            topic.totalQuestions - topic.correct - topic.incorrect === 0
        );
      default:
        return topics; // Default or 'All' filter
    }
  };

  // Function to determine button style
  const buttonStyle = (filter) => {
    return `px-2 py-1 m-1 ${
      currentFilter === filter
        ? "bg-cyan-100 text-cyan-500"
        : "bg-gray-100 text-zinc-400"
    } rounded-md text-xs`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg  w-full overflow-auto mb-0 xl:mb-0">
      <div className="p-4 flex-1 flex justify-between flex-row items-start md:items-center">
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <h2 className="text-xl">Quiz Topics</h2>
          {selectedQuizzes.length > 0 && (
            <div className="flex flex-row items-center cursor-pointer text-sm mt-1 md:mt-0">
              <h3 className="p-0 md:pl-4 text-cyan-500">Start</h3>
              <FontAwesomeIcon
                icon={faAngleRight}
                className="text-cyan-500 text-base ml-1"
              />
            </div>
          )}
        </div>
        <div className="font-regular flex flex-row items-end">
          <button
            className={buttonStyle("All")}
            onClick={() => handleFilterChange("All")}
          >
            All
          </button>
          <button
            className={buttonStyle("Uncompleted")}
            onClick={() => handleFilterChange("Uncompleted")}
          >
            Uncompleted
          </button>
          <button
            className={buttonStyle("Completed")}
            onClick={() => handleFilterChange("Completed")}
          >
            Completed
          </button>
        </div>
      </div>

      {/* header row */}
      <div
        className="flex border-b text-xs font-medium flex-row items-center px-4 py-2 text-zinc-400 cursor-pointer"
        onClick={() => toggleSelectAll(!isAllSelected)} // This line added to make the entire row clickable
      >
        <Checkbox
          checked={isAllSelected}
          onChange={(e) => {
            e.stopPropagation(); // This prevents the row click event when checkbox is specifically clicked
            toggleSelectAll(!isAllSelected);
          }}
        />
        <div className="w-5/12 pl-2">Topics</div>
        <div className="w-6/12 pl-10">Progress</div>
      </div>

      {filteredTopics()
        .slice(0, isTruncated && !isExpanded ? 8 : filteredTopics().length)
        .map((topic) => {
          const total = topic.totalQuestions;
          const correct = topic.correct;
          const incorrect = topic.incorrect;
          const unanswered = total - (correct + incorrect);
          const correctPercentage = (correct / total) * 100;
          const incorrectPercentage = (incorrect / total) * 100;
          const unansweredPercentage = (unanswered / total) * 100;

          return (
            <div
              key={topic.id}
              className="flex border-b items-center px-4 py-2 bg-white cursor-pointer"
              onClick={() => toggleSelectQuiz(topic.id)}
            >
              <Checkbox
                checked={selectedQuizzes.includes(topic.id)}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleSelectQuiz(topic.id);
                }}
              />
              <div className="w-5/12 pl-2 text-sm font-semibold">
                {topic.name}
              </div>
              <div className="w-6/12 pl-10 flex items-center">
                {correctPercentage > 0 && (
                  <div
                    style={{ width: `${correctPercentage}%` }}
                    className="h-1.5 bg-green-400 rounded-md m-0.5"
                  ></div>
                )}
                {incorrectPercentage > 0 && (
                  <div
                    style={{ width: `${incorrectPercentage}%` }}
                    className="h-1.5 bg-red-400 rounded-md m-0.5"
                  ></div>
                )}
                {unansweredPercentage > 0 && (
                  <div
                    style={{ width: `${unansweredPercentage}%` }}
                    className="h-1.5 bg-gray-300 rounded-md m-0.5"
                  ></div>
                )}
              </div>
            </div>
          );
        })}

      {isTruncated && topics.length > 8 && (
        <div className="flex justify-center">
          <button
            onClick={handleToggleExpand}
            className="bg-gradient-to-r from-blue-300 to-cyan-400 w-full hover:bg-gradient-to-r hover:from-blue-400 hover:to-cyan-500 text-white font-bold py-0.5 px-2 flex items-center justify-center transition-all duration-300 ease-in-out"
          >
            {isExpanded ? (
              <FontAwesomeIcon icon={faAngleUp} className="text-xl" />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} className="text-xl" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Quizzes;
