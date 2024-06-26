import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config"; // Ensure this path is correct
import { signInWithEmailAndPassword } from "firebase/auth";
import Lottie from "react-lottie";
import spinnerAnimation from "./spinner.json"; // Ensure this path is correct
import Google from "./google.webp";
import { useAuth } from "../../AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signInError, setSignInError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const {
    setCurrentUser,
    setStripeId,
    setHasActiveSubscription,
    fetchUserData, // Ensure you destruct this from useAuth
  } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Authentication successful:", userCredential.user);
      const userData = await fetchUserData(userCredential.user);
      if (userData) {
        setCurrentUser(userCredential.user);
        setStripeId(userData.stripeId || null);
        setHasActiveSubscription(userData.hasActiveSubscription);
        if (userData.hasActiveSubscription) {
          navigate("/home");
        } else {
          navigate("/pricing");
        }
      } else {
        throw new Error("Failed to retrieve user data");
      }
    } catch (error) {
      console.error("Authentication or data fetch failed:", error);
      setIsSigningIn(false);
      setSignInError(error.message || "An error occurred. Please try again.");
    }
  };

  const handleSignUpClick = () => {
    navigate("/register"); // Use navigate to go to the register page
  };

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
          {/* Password input with eye icon */}
          <div className="mb-4 relative">
            <div className="flex items-center relative border rounded shadow appearance-none w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setSignInError(""); // Reset the error when user edits the field
                }}
                className="py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <FontAwesomeIcon
                icon={faEye}
                onClick={togglePasswordVisibility}
                className={`absolute inset-y-0 right-3 my-auto text-gray-400 hover:text-gray-600 cursor-pointer ${
                  showPassword ? "text-gray-600" : "text-gray-400"
                }`}
                style={{ zIndex: 10 }} // Ensure the icon is above the input in layer stack
              />
            </div>
            {signInError && (
              <p className="text-red-500 text-xs italic mt-2">{signInError}</p>
            )}
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
          <div className="flex flex-col mt-4 items-center w-full">
            <h2 className="justify-center text-sm text-cyan-500">
              Not got an account?{" "}
              <span
                className="font-semibold cursor-pointer underline"
                onClick={handleSignUpClick}
              >
                Sign up!
              </span>
            </h2>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
