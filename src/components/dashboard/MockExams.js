import React, { useState } from "react";
import Checkbox from "./Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const MockExams = ({ exams }) => {
  const [selectedExam, setSelectedExam] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("All");

  const toggleSelectExam = (id) => {
    setSelectedExam(selectedExam === id ? null : id);
  };

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const filteredExams = () => {
    switch (currentFilter) {
      case "Completed":
        return exams.filter(exam => exam.correct + exam.incorrect === exam.totalQuestions);
      case "Uncompleted":
        return exams.filter(exam => exam.correct + exam.incorrect < exam.totalQuestions);
      default:
        return exams; // Default or 'All' filter
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
    <div className="bg-white rounded-lg shadow-lg w-full overflow-auto mb-4">
      <div className="p-4 pb-2 -1 flex justify-between flex-row items-start md:items-center">
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <h2 className="text-xl">Mock Exams</h2>
          {selectedExam && (
            <div className="flex flex-row items-center cursor-pointer text-sm mt-1 md:mt-0">
              <h3 className="p-0 md:pl-4 text-cyan-500">Start</h3>
              <FontAwesomeIcon icon={faAngleRight} className="text-cyan-500 text-base ml-1" />
            </div>
          )}
        </div>
        <div className="font-regular flex flex-row items-end">
          <button className={buttonStyle("All")} onClick={() => handleFilterChange("All")}>All</button>
          <button className={buttonStyle("Uncompleted")} onClick={() => handleFilterChange("Uncompleted")}>Uncompleted</button>
          <button className={buttonStyle("Completed")} onClick={() => handleFilterChange("Completed")}>Completed</button>
        </div>
      </div>

      <div className="flex border-b text-xs font-medium flex-row items-center px-4 py-2 text-zinc-400">
        <div className="w-4 h-4 bg-white mr-4"></div>
        <div className="w-5/12 pl-2">Exam Name</div>
        <div className="w-6/12 pl-10">Progress</div>
      </div>

      {filteredExams().map((exam) => {
        const correctPercentage = (exam.correct / exam.totalQuestions) * 100;
        const incorrectPercentage = (exam.incorrect / exam.totalQuestions) * 100;
        const unansweredPercentage = 100 - correctPercentage - incorrectPercentage;
        
        return (
          <div key={exam.id} className="flex border-b items-center px-4 py-2 bg-white cursor-pointer"
               onClick={() => toggleSelectExam(exam.id)}>
            <Checkbox checked={selectedExam === exam.id} onChange={(e) => {
              e.stopPropagation();
              toggleSelectExam(exam.id);
            }} />
            <div className="w-5/12 pl-2 text-sm font-semibold">{exam.exam}</div>
            <div className="w-6/12 pl-10 flex items-center">
              <div style={{ width: `${correctPercentage}%` }} className="h-1.5 bg-green-400 rounded-md m-0.5"></div>
              <div style={{ width: `${incorrectPercentage}%` }} className="h-1.5 bg-red-400 rounded-md m-0.5"></div>
              <div style={{ width: `${unansweredPercentage}%` }} className="h-1.5 bg-gray-300 rounded-md m-0.5"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MockExams;
