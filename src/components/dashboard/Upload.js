import React, { useState, useEffect } from 'react';
import { db } from "../../firebase-config";
import Papa from 'papaparse';
import { collection, addDoc, getDocs, updateDoc } from 'firebase/firestore';

function UploadQuestions() {
  const [file, setFile] = useState(null);
  const [topicsMap, setTopicsMap] = useState({});

  const fetchTopics = async () => {
    const topicsCollection = collection(db, 'topics');
    const snapshot = await getDocs(topicsCollection);
    const topics = {};
    snapshot.forEach(doc => {
      topics[doc.data().name] = {
        ref: doc.ref,
        count: 0 // Initialize question count for each topic
      };
    });
    setTopicsMap(topics);
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const updateTopicCounts = async () => {
    for (const [topicName, topicInfo] of Object.entries(topicsMap)) {
      if (topicInfo.count > 0) { // Only update topics that have new questions
        await updateDoc(topicInfo.ref, {
          numQuestions: topicInfo.count // Set the count of questions for each topic
        });
      }
    }
  };

  const uploadQuestions = async () => {
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        const questions = results.data;
        for (const question of questions) {
          const topicName = question.Topic || 'General';
          console.log(topicName);
          if (!topicsMap[topicName]) {
            console.error(`Topic '${topicName}' not found in the database.`);
            return; // Stop processing if a topic is not found
          }

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
            topicReference: topicsMap[topicName].ref,
            explanation: question.Explanation,
          };
          await addDoc(collection(db, 'questions'), formattedQuestion);
          topicsMap[topicName].count += 1; // Increment the count of questions for the topic
          console.log(topicName + " count is " + topicsMap[topicName].count)
        }
        await updateTopicCounts(); // Update the numQuestions field for each topic after all questions are uploaded
        alert('All questions uploaded successfully!');
      },
    });
  };

  return (
    <div className='shadow-lg rounded-lg w-full'>
      <input type="file" onChange={handleFileChange} accept=".csv" />
      <button onClick={uploadQuestions}>Upload Questions</button>
    </div>
  );
}

export default UploadQuestions;
