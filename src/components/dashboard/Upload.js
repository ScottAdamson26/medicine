import React, { useState, useEffect } from 'react';
import { db } from "../../firebase-config";
import Papa from 'papaparse';
import { collection, addDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

function UploadQuestions() {
  console.log("started upload")
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
      // Update all topics regardless of count
      await updateDoc(topicInfo.ref, {
        numQuestions: topicInfo.count
      });
    }
  };

  const uploadQuestions = async () => {
    if (!file) return;

    // Reset topics count before processing new file
    Object.keys(topicsMap).forEach(topicName => {
      topicsMap[topicName].count = 0;
    });

    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        const questions = results.data;
        for (const question of questions) {
          const topicName = question.Topic || 'General';
          if (!topicsMap[topicName]) {
            console.error(`Topic '${topicName}' not found in the database.`, question);
            continue; // Use continue instead of return to process other questions
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
          topicsMap[topicName].count += 1;
        }
        await updateTopicCounts();
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
