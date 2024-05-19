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
  const [planName, setPlanName] = useState("Free Plan"); // Default to Free Plan
  const [loading, setLoading] = useState(true);
  const [name, SetName] = useState(null);
  const [profilePictureIndex, setProfilePictureIndex] = useState(0); // State for profile picture index

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setStripeId(null);
      setHasActiveSubscription(false);
      setPlanName("Free Plan"); // Reset to Free Plan on logout
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const fetchUserData = async (user) => {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const data = userDoc.data();

      const subscriptionsRef = collection(db, `users/${user.uid}/subscriptions`);
      const subscriptionSnapshot = await getDocs(subscriptionsRef);
      const subscriptions = [];

      subscriptionSnapshot.forEach(doc => {
        const subData = doc.data();
        subscriptions.push(subData);
      });

      subscriptions.sort((a, b) => b.created - a.created);

      const mostRecentSubscription = subscriptions[0];
      let activeSubscription = false;
      let currentPlanName = "Free Plan";

      console.log("here is the most recenet sub " + mostRecentSubscription);
      if (mostRecentSubscription && mostRecentSubscription.status === "active") {
        const itemName = mostRecentSubscription.items && mostRecentSubscription.items.length > 0 
                          ? mostRecentSubscription.items[0].price.product.name 
                          : "Free Plan";

        currentPlanName = itemName;
        activeSubscription = true;
        console.log("here it is fam " + mostRecentSubscription.items[0].price.product )
      }

      setCurrentUser(user);
      setStripeId(data.stripeId || null);
      setHasActiveSubscription(activeSubscription);
      setPlanName(currentPlanName);
      SetName(data.name || null);
      setProfilePictureIndex(data.profilePicture !== undefined ? data.profilePicture : 0);

      return { ...data, hasActiveSubscription: activeSubscription, planName: currentPlanName };
    } else {
      console.log("No user data found");
      setCurrentUser(user);
      setHasActiveSubscription(false);
      setPlanName("Free Plan");
      return null;
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
        setPlanName("Free Plan");
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
      planName,
      loading,
      fetchUserData,
      logout,
      name,
      SetName,
      profilePictureIndex,
      setProfilePictureIndex // Ensure this is provided
    }}>
      {children}
    </AuthContext.Provider>
  );
};
