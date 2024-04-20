import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [stripeId, setStripeId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user data with retry logic
  const fetchUserData = async (user) => {
    const userRef = doc(db, "users", user.uid);
    let attempts = 0;
    const maxAttempts = 5;  // Maximum number of attempts
    while (attempts < maxAttempts) {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists() && userDoc.data().stripeId) {
            return userDoc.data();  // Return the data once stripeId is available
        }
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retrying
    }
    console.error("Failed to retrieve stripeId after several attempts.");
    return null;  // Return null if the stripeId isn't fetched after retries
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        const userData = await fetchUserData(user);
        if (userData && userData.stripeId) {
          setStripeId(userData.stripeId);
          setCurrentUser(user);
        } else {
          // If no userData or stripeId could be fetched after retries
          setStripeId(null);
          setCurrentUser(user);  // Optionally keep the user set even if no stripeId
        }
      } else {
        setStripeId(null);
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, stripeId, loading, setStripeId }}>
      {children}
    </AuthContext.Provider>
  );
};
