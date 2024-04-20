import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase-config"; // Ensure this path is correct
import { signInWithEmailAndPassword } from "firebase/auth";
import Lottie from "react-lottie";
import spinnerAnimation from "./spinner.json"; // Ensure this path is correct
import Google from "./google.webp";
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../../AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signInError, setSignInError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { currentUser, stripeId, setCurrentUser, setStripeId } = useAuth();

  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Authentication successful:", userCredential.user);
      // Fetch the user document again to ensure stripeId is loaded
      const userRef = doc(db, "users", userCredential.user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setCurrentUser(userCredential.user);  // Ensure user is set in context
        setStripeId(userData.stripeId || null); // Make sure stripeId is updated in context
        if (userData.stripeId) {
          navigate("/home");
        } else {
          navigate("/pricing");
        }
      } else {
        throw new Error('User document does not exist');
      }
    } catch (error) {
      console.error("Authentication or data fetch failed:", error);
      setIsSigningIn(false);
      setSignInError(error.message || "An error occurred. Please try again.");
    }
  };
  

  // Check and log the Stripe ID
  useEffect(() => {
    if (currentUser) {
      console.log("Current Stripe ID:", stripeId);
    }
  }, [currentUser, stripeId]);  




  return (
    <div className="flex justify-center items-center h-screen text-zinc-800 px-4">
      <div className="w-full max-w-sm bg-gradient-to-r from-blue-300 to-cyan-400 p-1 rounded-xl shadow-md">
        <form
          onSubmit={handleSignIn} // Use the handleSignIn function when the form is submitted
          className="bg-white shadow-md rounded-lg p-8"
        >
          <h1 className="text-2xl font-bold mb-4 text-center">Log in</h1>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSignInError(""); // Clear error when user edits the field
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setSignInError("");
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <FontAwesomeIcon
              icon={faEye}
              onClick={togglePasswordVisibility}
              className={`absolute inset-y-0 right-3 my-auto text-gray-400 opacity-40 hover:text-gray-600 h cursor-pointer ${showPassword ? 'text-gray-600' : 'text-gray-400'}`}
            />
            {signInError && <p className="text-red-500 text-xs italic mt-2">{signInError}</p>}
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-300 to-cyan-400 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center items-center"
              disabled={isSigningIn}
            >
              {isSigningIn ? (
                <div
                  className="inline-block"
                  style={{ width: "24px", height: "24px" }}
                >
                  <Lottie
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: spinnerAnimation,
                      rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice",
                      },
                    }}
                  />
                </div>
              ) : (
                "Sign in"
              )}
            </button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex-grow border-t border-cyan-600"></div>
            <span className="flex-shrink mx-4 text-cyan-600 text-sm">OR</span>
            <div className="flex-grow border-t border-cyan-600"></div>
          </div>

          <button className="bg-white border-2 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block w-full text-center flex justify-center items-center space-x-2">
            <img
              src={Google}
              alt="Google logo"
              className="inline-block h-6 align-middle mr-4"
            />
            <span className="align-middle">Sign in with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
