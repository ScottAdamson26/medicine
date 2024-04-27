import React, { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import { doc, getDocs, query, collection, where, limit } from "firebase/firestore";
import { db } from "../../firebase-config";

const Quiz = ({currentTopicIds}) => {
  const [checkedState, setCheckedState] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [questionData, setQuestionData] = useState(null); // This will store the question document data
  const [submitted, setSubmitted] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [incorrectIndex, setIncorrectIndex] = useState(null);

  useEffect(() => {
    const fetchRandomQuestion = async () => {
      if (currentTopicIds && currentTopicIds.length > 0) {
        console.log("Fetching question for topic IDs: ", currentTopicIds);
        const randomTopicId = currentTopicIds[Math.floor(Math.random() * currentTopicIds.length)];
        console.log("Selected Random Topic ID: ", randomTopicId);

        // Create a reference to the topic document
        const topicRef = doc(db, "topics", randomTopicId);
        console.log("Created reference for topic: ", topicRef);

        // Build a query to fetch a random question from this topic
        const questionsRef = collection(db, "questions");
        const q = query(questionsRef, where("topicReference", "==", topicRef), limit(1));

        try {
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const questionDoc = querySnapshot.docs[0];
            console.log("Fetched Question Data: ", questionDoc.data());
            const data = questionDoc.data();
            setQuestionData({
              ...data,
              answers: data.options.map(option => ({
                text: option.answer,
                correct: option.isCorrect
              }))
            });
          } else {
            console.log("No questions found for selected topic.");
            setQuestionData(null);
          }
        } catch (error) {
          console.error("Error fetching question: ", error);
          setQuestionData(null);
        }
      } else {
        console.log("No valid Topic IDs array provided.");
      }
    };

    fetchRandomQuestion();
  }, [currentTopicIds]);

  if (!questionData) {
    console.log("Loading question..."); // This log will show up continuously if the data doesn't load
    return <div>Loading question...</div>;
  }
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

  return (
    <div className="flex flex-col w-full bg-white rounded-xl shadow-lg p-8 mb-4 ">
      <div className="w-full justify-between text-cyan-400 text-xs">
        <h1>Question 1 of 2</h1>
      </div>
      {/* Question content here */}
      <div className="mt-2 text-base font-semibold">
        <h2>{questionData.question}</h2>
        <h3 className="mt-4">{questionData.prompt}</h3>
      </div>

      {/* Answer options here */}
      <div className="mt-8 text-sm">
        {questionData.answers.map((answer, index) => (
          <div
            key={index}
            className={`flex items-center rounded-lg shadow-custom-lg p-4 cursor-pointer mb-6 ${getAnswerBackground(
              index
            )}`}
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

        { submitted && (
          <div>
            <div className="w-full h-px bg-cyan-200 mb-6"/>
          <div className="rounded-lg p-4 shadow-custom-lg mb-6">
            <h3 className="text-cyan-400 text-xs">Explanation </h3>
            <p className="mt-2 text-base font-semibold">{questionData.explanation}</p>
            </div>
            </div>
        )}
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
