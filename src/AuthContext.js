import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, collection, getDocs, updateDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [stripeId, setStripeId] = useState(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [planName, setPlanName] = useState(null); // No default value
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(null);
  const [profilePictureIndex, setProfilePictureIndex] = useState(0); // State for profile picture index
  const [emailVerified, setEmailVerified] = useState(false); // New state variable

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setStripeId(null);
      setHasActiveSubscription(false);
      setPlanName(null); // Reset to null on logout
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
      let currentPlanName = null; // Default to null

      if (mostRecentSubscription && mostRecentSubscription.status === "active") {
        const itemName = mostRecentSubscription.items && mostRecentSubscription.items.length > 0 
                          ? mostRecentSubscription.items[0].price.product.name 
                          : null;

        currentPlanName = itemName;
        activeSubscription = true;
      }

      setCurrentUser(user);
      setStripeId(data.stripeId || null);
      setHasActiveSubscription(activeSubscription);
      setPlanName(currentPlanName);
      setName(data.name || null);
      setProfilePictureIndex(data.profilePicture !== undefined ? data.profilePicture : 0);
      setEmailVerified(data.verified || false); // Set emailVerified

      return { ...data, hasActiveSubscription: activeSubscription, planName: currentPlanName, emailVerified: data.verified || false };
    } else {
      setCurrentUser(user);
      setHasActiveSubscription(false);
      setPlanName(null); // Set to null if no user data
      setEmailVerified(false); // Set to false if no user data
      return null;
    }
  };

  const updateProfilePictureIndex = async (index) => {
    if (currentUser) {
      try {
        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, { profilePicture: index });
        setProfilePictureIndex(index);
      } catch (error) {
        console.error("Failed to update profile picture:", error);
      }
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
        setPlanName(null); // Reset to null if no user
        setEmailVerified(false); // Reset to false if no user
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
      setName,
      profilePictureIndex,
      setProfilePictureIndex,
      updateProfilePictureIndex,
      emailVerified // Provide emailVerified in the context
    }}>
      {children}
    </AuthContext.Provider>
  );
};
