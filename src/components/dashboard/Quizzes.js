import React, { useState, useEffect } from "react";
import Checkbox from "./Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../AuthContext";

const Quizzes = ({ topics, isTruncated, setShowQuiz, setCurrentTopicIds }) => {
  const { planName } = useAuth();
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("All");

  const isFreePlan = planName === "Free Plan";

  useEffect(() => {
    if (isFreePlan) {
      setSelectedQuizzes([]);
    }
    // Log all rows of data in "topics" to the console
    console.log("Topics data:");
    topics.forEach((topic, index) => {
      console.log(`Topic ${index + 1}:`, topic);
    });
  }, [isFreePlan, topics]);

  const toggleSelectAll = (isChecked) => {
    if (isFreePlan) {
      if (isChecked) {
        setSelectedQuizzes(["trial"]);
      } else {
        setSelectedQuizzes([]);
      }
    } else {
      if (isChecked) {
        setSelectedQuizzes(topics.map((topic) => topic.id));
      } else {
        setSelectedQuizzes([]);
      }
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

  const isAllSelected = isFreePlan
    ? selectedQuizzes.includes("trial")
    : selectedQuizzes.length === topics.length;

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const getTotalQuestions = () => {
    const total = filteredTopics().reduce((acc, topic) => {
      if (selectedQuizzes.includes(topic.id)) {
        return acc + parseInt(topic.totalQuestions, 10); // Ensure topic has 'totalQuestions' field
      }
      return acc;
    }, 0);

    return total;
  };

  const filteredTopics = () => {
    let filtered = topics;

    switch (currentFilter) {
      case "Uncompleted":
        filtered = filtered.filter(
          (topic) =>
            topic.totalQuestions -
            topic.correct -
            (topic.attempts - topic.correct) >
            0
        );
        break;
      case "Completed":
        filtered = filtered.filter(
          (topic) =>
            topic.totalQuestions -
            topic.correct -
            (topic.attempts - topic.correct) ===
            0
        );
        break;
      default:
        break;
    }

    if (isFreePlan) {
      return [{ id: "trial", name: "Trial Questions", totalQuestions: "20", correct: 0, attempts: 0 }, ...filtered];
    }

    return filtered.filter((topic) => topic.name !== "Trial Questions");
  };

  const buttonStyle = (filter) => {
    return `px-2 py-1 m-1 ${
      currentFilter === filter
        ? "bg-cyan-100 text-cyan-500"
        : "bg-gray-100 text-zinc-400"
    } rounded-md text-xs`;
  };

  return (
    <div className="z-10 mb-0 w-full overflow-auto rounded-lg bg-white shadow-lg xl:mb-0">
      <div className="flex flex-1 flex-row items-start justify-between px-4 pt-4 md:items-center">
        <div className="flex flex-col items-start md:flex-row md:items-center">
          <h2 className="text-xl">Quiz Topics</h2>
          {selectedQuizzes.length > 0 && (
            <div
              className="mt-1 flex cursor-pointer flex-row items-center text-sm md:mt-0"
              onClick={() => {
                setShowQuiz(true);
                setCurrentTopicIds(selectedQuizzes);
              }}
            >
              <h3 className="hidden p-0 text-cyan-500 md:block md:pl-4">
                Start {getTotalQuestions()} questions
              </h3>
              <FontAwesomeIcon
                icon={faAngleRight}
                className="ml-1 hidden text-base text-cyan-500 md:block"
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
      {selectedQuizzes.length > 0 && (
        <div className="flex flex-row items-center px-4 pb-2 text-sm md:hidden">
          <h3 className="p-0 text-cyan-500">
            Start {getTotalQuestions()} questions
          </h3>
          <FontAwesomeIcon
            icon={faAngleRight}
            className="ml-1 text-base text-cyan-500"
          />
        </div>
      )}
      <div
        className="flex cursor-pointer flex-row items-center border-b px-4 py-2 text-xs font-medium text-zinc-400"
        onClick={() => toggleSelectAll(!isAllSelected)}
      >
        <Checkbox
          checked={isAllSelected}
          onChange={(e) => {
            e.stopPropagation();
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
          const attempts = topic.attempts;
          const incorrect = attempts - correct;
          const unanswered = total - attempts;
          const correctPercentage = (correct / total) * 100;
          const incorrectPercentage = (incorrect / total) * 100;
          const unansweredPercentage = (unanswered / total) * 100;

          return (
            <div
              key={topic.id}
              className={`flex items-center border-b px-4 py-2 ${
                isFreePlan && topic.id !== "trial"
                  ? "cursor-not-allowed bg-gray-50 text-gray-400"
                  : "cursor-pointer bg-white"
              }`}
              onClick={
                !isFreePlan || topic.id === "trial"
                  ? () => toggleSelectQuiz(topic.id)
                  : null
              }
            >
              <Checkbox
                checked={selectedQuizzes.includes(topic.id)}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleSelectQuiz(topic.id);
                }}
                disabled={isFreePlan && topic.id !== "trial"}
              />
              <div
                className={`w-5/12 pl-2 text-sm font-medium ${
                  isFreePlan && topic.id !== "trial"
                    ? "font-medium "
                    : "font-semibold"
                }`}
              >
                {topic.name}
              </div>
              <div className="flex w-6/12 items-center pl-10">
                {correctPercentage > 0 && (
                  <div
                    style={{ width: `${correctPercentage}%` }}
                    className="m-0.5 h-1.5 rounded-md bg-green-400"
                  ></div>
                )}
                {incorrectPercentage > 0 && (
                  <div
                    style={{ width: `${incorrectPercentage}%` }}
                    className="m-0.5 h-1.5 rounded-md bg-red-400"
                  ></div>
                )}
                {unansweredPercentage > 0 && (
                  <div
                    style={{ width: `${unansweredPercentage}%` }}
                    className="m-0.5 h-1.5 rounded-md bg-gray-300"
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
            className="flex w-full items-center justify-center bg-gradient-to-r from-blue-300 to-cyan-400 px-2 py-0.5 font-bold text-white transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-400 hover:to-cyan-500"
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
