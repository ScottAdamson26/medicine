// ListTopics.js
import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../firebase-config";

function ListTopics({ setTopics }) {
    useEffect(() => {
        const fetchTopics = async () => {
            const querySnapshot = await getDocs(collection(db, "topics"));
            const topicsArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                // Assuming totalQuestions is stored in Firestore or defaulting to a placeholder
                totalQuestions: doc.data().totalQuestions || 1,
                questionsAnswered: 0, // Placeholder for now
                correct: 0, // Placeholder
                incorrect: 0, // Placeholder
            }));
            setTopics(topicsArray);
        };

        fetchTopics();
    }, [setTopics]);

    // No visual output from ListTopics
    return null;
}

export default ListTopics;
