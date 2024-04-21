import React, { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import { doc, getDoc } from "firebase/firestore";
import { db } from"../../firebase-config";

const Quiz = () => {
  const [checkedState, setCheckedState] = useState([false, false, false, false, false]);
  const [questionData, setQuestionData] = useState(null); // This will store the question document data
  const [submitted, setSubmitted] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [incorrectIndex, setIncorrectIndex] = useState(null);

  // Fetch question from Firestore
  useEffect(() => {
    const fetchQuestion = async () => {
      const questionId = "G70O1GmjN1biopaf5w7M"; // Define the question ID here
      const questionDoc = doc(db, "questions", questionId);
      const docSnapshot = await getDoc(questionDoc);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        // Transform the answers into an array if they are stored as a map/object in Firestore
        const answers = Object.keys(data.answers).map(key => ({
          text: data.answers[key].answer,
          correct: data.answers[key].isCorrect
        }));
        setQuestionData({
          question: data.question,
          prompt: data.prompt,
          answers: answers
        });
      } else {
        console.error("No question found in Firestore");
      }
    };

    fetchQuestion();
  }, []);

  const handleCheckboxChange = (index) => {
    if (!submitted) {
      const newCheckedState = checkedState.map((item, i) => i === index);
      setCheckedState(newCheckedState);
      setSelectedIndex(index);
      setIncorrectIndex(null); // Reset incorrect index when making a new selection
    }
  };

  const handleSubmit = () => {
    if (selectedIndex === null) {
      alert("Please select an answer.");
    } else {
      if (!questionData.answers[selectedIndex].correct) {
        // Find the correct index
        const correctIndex = questionData.answers.findIndex(
          (answer) => answer.correct
        );
        setCheckedState(checkedState.map((_, i) => i === correctIndex));
        setIncorrectIndex(selectedIndex); // Keep track of the incorrect index
        setSelectedIndex(correctIndex);
      } else {
        setCheckedState(checkedState.map((_, i) => i === selectedIndex));
      }
      setSubmitted(true);
    }
  };

  const getAnswerBackground = (index) => {
    if (!submitted) {
      return checkedState[index] ? "bg-cyan-100" : "bg-white hover:bg-cyan-100";
    }

    if (questionData && questionData.answers[index].correct) {
      return "bg-green-300"; // Correct answer
    } else if (index === incorrectIndex) {
      return "bg-red-400"; // Incorrectly selected answer
    } else {
      return "bg-white"; // Non-selected answers after submission
    }
  };

  if (!questionData) {
    return <div>Loading question...</div>;
  }

  return (
    <div className="flex flex-col w-full bg-white rounded-xl shadow-lg p-8 mb-4">
      {/* Question content here */}
      <div className="mt-2 text-base">
        <h2>{questionData.question}</h2>
        <h3 className="mt-4">{questionData.prompt}</h3>
      </div>

      {/* Answer options here */}
      <div className="mt-8 text-sm">
        {questionData.answers.map((answer, index) => (
          <div
            key={index}
            className={`flex items-center rounded-lg shadow-md p-4 cursor-pointer mb-6 ${getAnswerBackground(index)}`}
            onClick={() => handleCheckboxChange(index)}
          >
            <div className="shrink-0 flex items-center">
              <Checkbox
                checked={checkedState[index]}
                onChange={() => handleCheckboxChange(index)}
                disabled={submitted}
              />
            </div>
            <span className="flex-1">{answer.text}</span>
          </div>
        ))}
      </div>

      {/* Submission button */}
      <div>
        <button
          onClick={handleSubmit}
          className="group px-4 py-2 text-xs font-medium text-cyan-500 rounded-lg bg-cyan-100 transition flex items-center duration-300 ease-in-out hover:bg-cyan-200"
        >
          <span className="transition-transform duration-300 ease-in-out">
            {submitted ? "Next Question" : "Submit Answer"}
          </span>
        </button>
        {selectedIndex === null && submitted && (
          <p className="text-red-500 text-xs mt-2">Please select an answer.</p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
