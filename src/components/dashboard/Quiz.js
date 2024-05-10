import React, { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import {
  doc,
  getDocs,
  query,
  collection,
  where,
  limit,
  setDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { useAuth } from "../../AuthContext";

const Quiz = ({ currentTopicIds }) => {
  const { currentUser } = useAuth(); // This fetches the current user from the AuthContext
  const [questions, setQuestions] = useState([]); // Array of questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index of the current question
  const [checkedState, setCheckedState] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [incorrectIndex, setIncorrectIndex] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    let total = 0;
    const fetchQuestions = async () => {
      if (currentTopicIds.length > 0) {
        let allQuestions = [];
        for (const { id } of currentTopicIds) {
          const topicRef = doc(db, "topics", id);
          const questionsRef = collection(db, "questions");
          const q = query(
            questionsRef,
            where("topicReference", "==", topicRef),
            limit(15)
          );

          try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
              allQuestions.push(
                ...querySnapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                  answers: doc.data().options.map((option) => ({
                    text: option.answer,
                    correct: option.isCorrect,
                  })),
                }))
              );
            }
          } catch (error) {
            console.error(`Error fetching questions for topic ${id}: `, error);
          }
        }

        if (allQuestions.length > 0) {
          setQuestions(allQuestions);
          setCheckedState(
            new Array(allQuestions[0].answers.length).fill(false)
          );
          setCurrentQuestionIndex(0);
        }
        // Calculate the total number of questions for the display
        total += currentTopicIds.reduce(
          (acc, topic) => acc + topic.totalQuestions,
          0
        );
        setTotalQuestions(total);
      }
    };

    fetchQuestions();
  }, [currentTopicIds]);

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setCheckedState(
        new Array(questions[nextIndex].answers.length).fill(false)
      ); // Reset the checked state for the new answers array
      setSubmitted(false);
      setSelectedIndex(null);
      setIncorrectIndex(null);
    } else {
      // If there are no more questions, you might want to handle it differently in the future,
      // but for now, you can do nothing or display a message.
      console.log("No more questions to display.");
    }
  };

  const handleCheckboxChange = (index) => {
    if (!submitted) {
      setCheckedState(checkedState.map((_, i) => i === index));
      setSelectedIndex(index);
      setIncorrectIndex(null);
    }
  };

  const updateUserProgress = async (questionId, wasCorrect) => {
    if (!currentUser) {
      console.error("No user logged in");
      return; // Prevents execution if there is no logged-in user
    }

    const userProgressRef = doc(db, "userProgress", currentUser.uid);

    const questionUpdate = {
      questionId: questionId,
      outcome: wasCorrect ? "correct" : "incorrect",
      timestamp: new Date(),
    };

    try {
      await setDoc(
        userProgressRef,
        {
          answeredQuestions: arrayUnion(questionUpdate),
        },
        { merge: true }
      );
      console.log("User progress updated or created.");
    } catch (error) {
      console.error("Error updating user progress: ", error);
    }
  };

  const handleSubmit = () => {
    if (selectedIndex === null) {
      alert("Please select an answer.");
      return;
    }

    const correctIndex = questions[currentQuestionIndex].answers.findIndex(
      (answer) => answer.correct
    );
    const wasCorrect =
      questions[currentQuestionIndex].answers[selectedIndex].correct;

    if (!wasCorrect) {
      setIncorrectIndex(selectedIndex); // Mark the selected index as incorrect
    } else {
      setIncorrectIndex(null); // Reset incorrect index because the correct answer was selected
    }

    setCheckedState(checkedState.map((_, i) => i === correctIndex)); // Ensure only the correct answer is marked checked
    setSelectedIndex(selectedIndex); // Always retain the selected index as user's choice
    setSubmitted(true);

    // Update user progress in Firebase
    updateUserProgress(questions[currentQuestionIndex].id, wasCorrect);
  };

  if (!questions.length) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col w-full bg-white rounded-xl shadow-lg p-8 mb-4">
      <div className="w-full justify-between text-cyan-400 text-xs">
        <h1>
        Question {currentQuestionIndex + 1} of {totalQuestions}
        </h1>
      </div>
      <div className="mt-2 text-base font-semibold">
        <h2>{currentQuestion.question}</h2>
        <h3 className="mt-4">{currentQuestion.prompt}</h3>{" "}
        {/* Ensure prompt is displayed */}
      </div>

      <div className="mt-8 text-sm">
        {currentQuestion.answers.map((answer, index) => (
          <div
            key={index}
            className={`flex items-center rounded-lg shadow-custom-lg p-4 cursor-pointer mb-6 ${getAnswerBackground(
              index,
              selectedIndex,
              incorrectIndex,
              submitted,
              questions,
              currentQuestionIndex
            )}`}
            onClick={() => handleCheckboxChange(index)}
          >
            <Checkbox
              checked={checkedState[index]}
              onChange={() => handleCheckboxChange(index)}
              disabled={submitted}
            />
            <span className="flex-1">{answer.text}</span>
          </div>
        ))}
      </div>

      {submitted && (
        <div>
          <div className="w-full h-px bg-cyan-200 mb-6" />
          <div className="rounded-lg p-4 shadow-custom-lg mb-6">
            <h3 className="text-cyan-400 text-xs">Explanation</h3>
            <p className="mt-2 text-base font-semibold">
              {currentQuestion.explanation}
            </p>
          </div>
        </div>
      )}

      <div>
        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="group px-4 py-2 text-xs font-medium text-cyan-500 rounded-lg bg-cyan-100 transition flex items-center duration-300 ease-in-out hover:bg-cyan-200"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="px-4 py-2 text-xs font-medium text-green-500 rounded-lg bg-green-100 transition flex items-center duration-300 ease-in-out hover:bg-green-200"
          >
            Next Question
          </button>
        )}
        {submitted && selectedIndex === null && (
          <p className="text-red-500 text-xs mt-2">Please select an answer.</p>
        )}
      </div>
    </div>
  );
};

export default Quiz;

function getAnswerBackground(
  index,
  selectedIndex,
  incorrectIndex,
  submitted,
  questions,
  currentQuestionIndex
) {
  if (!submitted) {
    return "bg-white hover:bg-cyan-100";
  }
  if (index === incorrectIndex) {
    return "bg-red-400"; // Incorrectly selected answer
  } else if (questions[currentQuestionIndex].answers[index].correct) {
    return "bg-green-300"; // Correct answer
  } else {
    return "bg-white"; // Non-selected answers
  }
}
