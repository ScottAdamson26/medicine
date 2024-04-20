import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getDocs, collection} from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [stripeId, setStripeId] = useState(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [loading, setLoading] = useState(true);
  const fetchUserData = async (user) => {
    const userRef = doc(db, "users", user.uid);
    console.log("Fetching user data for UID:", user.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const data = userDoc.data();
      console.log("User data found:", data);
      const subscriptionsRef = collection(db, `users/${user.uid}/subscriptions`);
      const subscriptionSnapshot = await getDocs(subscriptionsRef);
      let hasActiveSubscription = false;
      
      subscriptionSnapshot.forEach(doc => {
        const subscriptionData = doc.data();
        console.log(`Checking subscription ${doc.id}:`, subscriptionData);
        if (subscriptionData.status === "active") {
          hasActiveSubscription = true;
        }
      });
  
      if (hasActiveSubscription) {
        console.log("Active subscription found.");
        return { ...data, hasActiveSubscription: true };
      } else {
        console.log("No active subscription found.");
        return { ...data, hasActiveSubscription: false };
      }
    } else {
      console.log("No user data found");
      return null;  // Handle case where user data doesn't exist
    }
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        const userData = await fetchUserData(user);
        if (userData) {
          setStripeId(userData.stripeId);
          setCurrentUser(user);
          setHasActiveSubscription(userData.hasActiveSubscription);
        } else {
          setStripeId(null);
          setCurrentUser(user);
          setHasActiveSubscription(false);
        }
      } else {
        setStripeId(null);
        setCurrentUser(null);
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
      fetchUserData,  // Make sure to expose this function
    }}>
      {children}
    </AuthContext.Provider>
  );
  
};
