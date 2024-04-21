import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { signOut } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [stripeId, setStripeId] = useState(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [loading, setLoading] = useState(true);

  // Inside AuthProvider component
  
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setStripeId(null);
      setHasActiveSubscription(false);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  
  const fetchUserData = async (user) => {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const data = userDoc.data();
      console.log("User data found:", data);
      const subscriptionsRef = collection(db, `users/${user.uid}/subscriptions`);
      const subscriptionSnapshot = await getDocs(subscriptionsRef);
      let activeSubscription = false;
      
      subscriptionSnapshot.forEach(doc => {
        if (doc.data().status === "active") {
          activeSubscription = true;
        }
      });
  
      setCurrentUser(user);
      setStripeId(data.stripeId || null);
      setHasActiveSubscription(activeSubscription);

      return { ...data, hasActiveSubscription: activeSubscription };
    } else {
      console.log("No user data found");
      setCurrentUser(user); // Still set the user but mark the subscription as inactive
      setHasActiveSubscription(false);
      return null;  // Handle case where user data doesn't exist
    }
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        await fetchUserData(user);
      } else {
        setCurrentUser(null);
        setStripeId(null);
        setHasActiveSubscription(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{
      currentUser,
      setCurrentUser,
      stripeId,
      setStripeId,
      hasActiveSubscription,
      setHasActiveSubscription,
      loading,
      fetchUserData,
      logout,  // Expose the logout function
    }}>
      {children}
    </AuthContext.Provider>
  );
  
};
