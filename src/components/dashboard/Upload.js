import React, { useState } from 'react';
import { db } from "../../firebase-config";
import Papa from 'papaparse';
import { collection, addDoc } from 'firebase/firestore';

function UploadQuestions() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadQuestions = async () => {
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: async (results) => {
          const questions = results.data;
          for (const question of questions) {
            const formattedQuestion = {
              question: question.Question,
              prompt: question.Prompt,
              options: [
                { answer: question.A, isCorrect: question.Answer === 'A' },
                { answer: question.B, isCorrect: question.Answer === 'B' },
                { answer: question.C, isCorrect: question.Answer === 'C' },
                { answer: question.D, isCorrect: question.Answer === 'D' },
                { answer: question.E, isCorrect: question.Answer === 'E' },
              ],
              topic: question.Topic || 'General',
              explanation: question.Explanation,
            };
            await addDoc(collection(db, 'questions'), formattedQuestion);
          }
          alert('All questions uploaded successfully!');
        },
      });
    }
  };

  return (
    <div className='shadow-lg rounded-lg w-full'>
      <input type="file" onChange={handleFileChange} accept=".csv" />
      <button onClick={uploadQuestions}>Upload Questions</button>
    </div>
  );
}

export default UploadQuestions;
