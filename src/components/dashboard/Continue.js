import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Continue = ({ topicProgress = [], topics = [] }) => {
  const [recentTopics, setRecentTopics] = useState([]);

  useEffect(() => {
    if (topicProgress.length > 0) {
      // Sort the topicProgress array by lastUpdated in descending order
      const sortedTopicProgress = topicProgress
        .filter(progress => progress.lastUpdated) // Filter out any progress without lastUpdated
        .sort((a, b) => b.lastUpdated.toDate() - a.lastUpdated.toDate())
        .slice(0, 3); // Get the top 3 most recent topics

      // Match topicId in topicProgress with topics array to get the display name
      const recentTopics = sortedTopicProgress.map((progress) => {
        const topic = topics.find((t) => t.id === progress.topicId);
        return {
          name: topic ? topic.name : "Unknown Topic",
          topicId: progress.topicId,
          correct: progress.correct,
          attempts: progress.attempts,
          totalQuestions: topic ? topic.totalQuestions : 0,
        };
      });

      setRecentTopics(recentTopics);
    }
  }, [topicProgress, topics]); // Re-run the effect when topicProgress or topics change

  const gradientClasses = [
    "bg-gradient-to-r from-violet-200 to-pink-200",
    "bg-gradient-to-r from-green-200 to-lime-200",
    "bg-gradient-to-r from-yellow-200 to-amber-200"
  ];

  return (
    <div className="w-full flex flex-col">
      <h2 className="mb-4">Continue learning</h2>

      {recentTopics.map((topic, index) => {
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
            key={index}
            className="flex flex-row w-full mb-2 px-4 py-3 text-black rounded-lg shadow-md bg-white items-center justify-between text-base font-regular z-10"
          >
            {/* left div */}
            <div className="flex flex-row items-center w-1/2 h-full">
              {/* logo div */}
              <div className={`${gradientClasses[index % 3]} rounded-lg w-8 h-8 mr-4`} />

              <div className="flex-grow">
                <p className="text-sm font-medium mb-1">{topic.name}</p>
                <div className="w-full flex">
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
            </div>

            {/* right div */}
            <div className="w-1/2 flex flex-col items-end">
              <button className="group px-4 py-2 text-xs font-medium text-cyan-500 rounded-lg bg-cyan-100 transition flex items-center duration-300 ease-in-out hover:bg-cyan-200">
                <span className="transition-transform duration-300 ease-in-out">
                  Resume
                </span>
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Continue;
