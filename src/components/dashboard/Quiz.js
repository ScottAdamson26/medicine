import React, { useState } from 'react';
import Checkbox from './Checkbox';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Quiz = () => {
  const [checkedState, setCheckedState] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
const question = useState({
    text: 'A 65-year-old man is being treated for sepsis following a chest infection. He calls you over with a nosebleed and you notice big bruises over his arms where his blood was taken earlier. You believe he is suffering from disseminated intravascular coagulation. A set of blood tests are sent.',
    prompt: 'Which of the following results would best fit with this diagnosis?',
    answers: [
      { text: 'Platelet count low, Prothrombin time reduced, APTT reduced, Bleeding time reduced', correct: false },
      { text: 'Platelet count high, Prothrombin time prolonged, APTT prolonged, Bleeding time prolonged', correct: false },
      { text: 'Platelet count low, Prothrombin time normal, APTT normal, Bleeding time prolonged', correct: false },
      { text: 'Platelet count low, Prothrombin time prolonged. APTT prolonged, bleeding time prolonged', correct: true },
      { text: 'Platelet count normal, Prothrombin time prolonged, APTT prolonged, Bleeding time prolonged', correct: false },
    ]
  });

  const [submitted, setSubmitted] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [incorrectIndex, setIncorrectIndex] = useState(null);

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
      alert('Please select an answer.');
    } else {
      if (!question.answers[selectedIndex].correct) {
        // Find the correct index
        const correctIndex = question.answers.findIndex(answer => answer.correct);
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
      return checkedState[index] ? 'bg-cyan-100' : 'bg-white hover:bg-cyan-100';
    }

    if (question.answers[index].correct) {
      return 'bg-green-300'; // Correct answer
    } else if (index === incorrectIndex) {
      return 'bg-red-400'; // Incorrectly selected answer
    } else {
      return 'bg-white'; // Non-selected answers after submission
    }
  };

  return (
    <div className="flex flex-col w-full bg-white rounded-xl shadow-lg p-8 mb-4">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-xs font-bold text-cyan-400">Question 1 of 2</h1>
        <div className="text-sm flex">
          <div className="flex items-center">
            <p>2</p>
            <FontAwesomeIcon icon={faCircleCheck} className="text-green-400 m-2" />
          </div>
          <div className="flex items-center">
            <p>1</p>
            <FontAwesomeIcon icon={faCircleCheck} className="text-red-400 m-2" />
          </div>
        </div>
      </div>
      <div className="mt-2 text-base">
        <h2>{question.text}</h2>
        <h3 className="mt-4">{question.prompt}</h3>
      </div>

      <div className="mt-8 text-sm">
        {question.answers.map((answer, index) => (
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

      <div>
        <button
          onClick={handleSubmit}
          className="group px-4 py-2 text-xs font-medium text-cyan-500 rounded-lg bg-cyan-100 transition flex items-center duration-300 ease-in-out hover:bg-cyan-200"
        >
          <span className="transition-transform duration-300 ease-in-out">
            {submitted ? 'Next Question' : 'Submit Answer'}
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
