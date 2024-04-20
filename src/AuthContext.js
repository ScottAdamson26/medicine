const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [stripeId, setStripeId] = useState(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (user) => {
    const userRef = doc(db, "users", user.uid);
    let attempts = 0;
    const maxAttempts = 5;
    while (attempts < maxAttempts) {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const data = userDoc.data();
        const subscriptionsRef = doc(db, `users/${user.uid}/subscriptions`, 'subid'); // Assuming 'subid' needs to be replaced with actual subscription ID logic
        const subscriptionsDoc = await getDoc(subscriptionsRef);
        if (subscriptionsDoc.exists() && subscriptionsDoc.data().status === "active") {
          return { ...data, hasActiveSubscription: true };
        }
        return { ...data, hasActiveSubscription: false };
      }
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    return null;
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
    <AuthContext.Provider value={{ currentUser, setCurrentUser, stripeId, setStripeId, hasActiveSubscription, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
