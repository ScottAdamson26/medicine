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
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { useAuth } from "../../AuthContext";
import spinnerAnimation from "./spinner.json";
import Lottie from "react-lottie";

const Quiz = ({ currentTopicIds, setShowQuiz, setSelectedNav, toggleRefreshTopics }) => {
  const { currentUser } = useAuth(); // This fetches the current user from the AuthContext
  const [questions, setQuestions] = useState([]); // Array of questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index of the current question
  const [checkedState, setCheckedState] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [incorrectIndex, setIncorrectIndex] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [initialAttemptedQuestions, setInitialAttemptedQuestions] = useState(0); // Track initial attempted questions
  const [batchCount, setBatchCount] = useState(0); // Track the batch count

  useEffect(() => {
    const fetchQuestions = async (additional = false) => {
      if (currentTopicIds.length > 0 && currentUser) {
        const userProgressRef = doc(db, "userProgress", currentUser.uid);

        // Fetch answered questions
        const answeredQuestionsRef = collection(
          userProgressRef,
          "answeredQuestions"
        );
        const answeredSnapshot = await getDocs(answeredQuestionsRef);
        let answeredQuestionIds = answeredSnapshot.docs.map((doc) => doc.id);

        const questionsRef = collection(db, "questions");

        let totalQuestionsCount = 0;
        let totalAttemptedCount = 0;

        const queries = currentTopicIds.map(async ({ id }) => {
          const topicDoc = await getDoc(doc(db, "topics", id));
          if (topicDoc.exists()) {
            totalQuestionsCount += topicDoc.data().numQuestions;
          }

          const userProgressSnapshot = await getDoc(userProgressRef);
          const topicProgress = userProgressSnapshot.data().topicProgress || [];
          const topicData = topicProgress.find((tp) => tp.topicId === id);
          if (topicData) {
            totalAttemptedCount += topicData.attempts;
          }

          return query(
            questionsRef,
            where("topicReference", "==", doc(db, "topics", id)),
            limit(300 * (batchCount + 1)) // Fetch questions in batches of 300
          );
        });

        const resolvedQueries = await Promise.all(queries);
        const questionDocs = await Promise.all(
          resolvedQueries.map((q) => getDocs(q))
        );

        let allQuestions = [];
        questionDocs.forEach((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            allQuestions.push({
              id: doc.id,
              topicId: doc.data().topicReference.id,
              ...doc.data(),
              answers: doc.data().options.map((option) => ({
                text: option.answer,
                correct: option.isCorrect,
              })),
            });
          });
        });

        const newQuestions = allQuestions.filter(
          (question) => !answeredQuestionIds.includes(question.id)
        );

        setTotalQuestions(totalQuestionsCount);
        setInitialAttemptedQuestions(totalAttemptedCount);

        if (additional) {
          setQuestions((prevQuestions) => [...prevQuestions, ...newQuestions]);
        } else {
          setQuestions(newQuestions);
        }
        setCheckedState(
          new Array(newQuestions[0]?.answers.length || 0).fill(false)
        );
        setCurrentQuestionIndex(0);

        console.log("Initial Fetch: ");
        console.log("Total Questions: ", totalQuestionsCount);
        console.log("Initial Attempted Questions: ", totalAttemptedCount);
        console.log("Current Question Index: ", 0);
      }
    };

    if (currentUser) {
      fetchQuestions(); // Initial fetch
    }
  }, [currentTopicIds, currentUser, batchCount]);

  // Handle next question navigation
  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setCheckedState(
        new Array(questions[nextIndex].answers.length).fill(false)
      );
      setSubmitted(false);
      setSelectedIndex(null);
      setIncorrectIndex(null);

      // Fetch more questions if we've reached the end of the current batch
      if (nextIndex === questions.length - 10) {
        setBatchCount((prevBatchCount) => prevBatchCount + 1);
      }
    } else {
      console.log("No more questions to display.");
    }

    console.log("Next Question: ");
    console.log("Current Question Index: ", nextIndex);
  };

  const handleCheckboxChange = (index) => {
    if (!submitted) {
      setCheckedState(checkedState.map((_, i) => i === index));
      setSelectedIndex(index);
      setIncorrectIndex(null);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: spinnerAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const updateUserProgress = async (questionId, wasCorrect, topicId) => {
    if (!currentUser) {
      console.error("No user logged in");
      return; // Prevents execution if there is no logged-in user
    }

    // Reference to user progress document
    const userProgressRef = doc(db, "userProgress", currentUser.uid);

    // Reference for the answered question in the subcollection
    const questionProgressRef = doc(
      userProgressRef,
      "answeredQuestions",
      questionId
    );

    // Update data for the answered question
    const questionUpdate = {
      outcome: wasCorrect ? "correct" : "incorrect",
      timestamp: new Date(),
    };

    try {
      // Retrieve current user progress
      const userProgressSnapshot = await getDoc(userProgressRef);
      let topicProgress =
        userProgressSnapshot.exists() &&
        userProgressSnapshot.data().topicProgress
          ? userProgressSnapshot.data().topicProgress
          : [];

      // Find or initialize the topic progress data
      const index = topicProgress.findIndex((tp) => tp.topicId === topicId);
      if (index !== -1) {
        // Update existing topic progress
        topicProgress[index].attempts += 1;
        if (wasCorrect) {
          topicProgress[index].correct += 1;
        }
        topicProgress[index].lastUpdated = new Date();
      } else {
        // Create new topic progress entry
        topicProgress.push({
          topicId: topicId,
          attempts: 1,
          correct: wasCorrect ? 1 : 0,
          lastUpdated: new Date(),
        });
      }

      // Update or create the user progress document with new data
      await setDoc(
        userProgressRef,
        {
          topicProgress: topicProgress,
        },
        { merge: true }
      );

      // Set the document for the answered question
      await setDoc(questionProgressRef, questionUpdate, { merge: true });

      console.log(
        "User progress updated or created for question and topic:",
        questionId,
        topicId
      );
    } catch (error) {
      console.error("Error updating user progress: ", error);
    }
  };

  const handleSubmit = () => {
    if (selectedIndex === null) {
      alert("Please select an answer.");
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const correctIndex = currentQuestion.answers.findIndex(
      (answer) => answer.correct
    );
    const wasCorrect = currentQuestion.answers[selectedIndex].correct;

    if (!wasCorrect) {
      setIncorrectIndex(selectedIndex); // Mark the selected index as incorrect
    } else {
      setIncorrectIndex(null); // Reset incorrect index because the correct answer was selected
    }

    setCheckedState(checkedState.map((_, i) => i === correctIndex));
    setSelectedIndex(selectedIndex);
    setSubmitted(true);

    console.log("Submit Answer: ");
    console.log("Selected Index: ", selectedIndex);
    console.log("Correct Index: ", correctIndex);
    console.log("Was Correct: ", wasCorrect);
    console.log("Current Question Index: ", currentQuestionIndex);

    // Pass the topic ID of the current question to the progress update function
    updateUserProgress(currentQuestion.id, wasCorrect, currentQuestion.topicId);
  };

  const handleEndQuiz = () => {
    setShowQuiz(false);
    toggleRefreshTopics(); // Call the function to refresh the topics
    setSelectedNav("Dashboard");
  };

  if (!questions.length) {
    return (
      <div className="flex flex-col justify-center items-center w-full bg-white rounded-xl shadow-lg p-8 mb-4 h-4/5">
        <Lottie options={defaultOptions} height={28} width={28} />
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col w-full bg-white rounded-xl shadow-lg p-8 mb-4">
      <div className="w-full justify-between text-cyan-400 text-xs">
        <h1>
          Question {initialAttemptedQuestions + currentQuestionIndex + 1} of{" "}
          {totalQuestions}
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

      <div className="flex justify-between items-center mt-1">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-xs font-medium text-cyan-500 rounded-lg bg-cyan-100 transition flex items-center duration-300 ease-in-out hover:bg-cyan-200"
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
        <button
          onClick={handleEndQuiz}
          className="px-4 py-2 text-xs font-medium text-red-500 rounded-lg bg-red-100 transition flex items-center duration-300 ease-in-out hover:bg-red-200"
        >
          End Quiz
        </button>
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
