import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../firebase-config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Lottie from "react-lottie";
import spinnerAnimation from "./spinner.json"; // Verify this path is correct
import Google from "./google.webp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: spinnerAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsRegistering(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsRegistering(false);
      setRegistrationSuccess(true);
      setTimeout(() => navigate("/sign-in"), 2000);  // Delay redirection to show success message push
    } catch (error) {
      console.error(error.message);
      setIsRegistering(false);
      setRegistrationSuccess(false);
      if (error.code === "auth/email-already-in-use") {
        setEmailError("This email already exists. Sign in");
      } else if (error.code === "auth/weak-password") {
        setPasswordError("Weak password: Password should be at least 6 characters.");
      } else {
        setEmailError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setIsRegistering(true);
    try {
      await signInWithPopup(auth, googleProvider);
      setIsRegistering(false);
      setRegistrationSuccess(true);
      setTimeout(() => navigate("/sign-in"), 3000);  // Delay redirection to show success message
    } catch (error) {
      console.error(error.message);
      setIsRegistering(false);
      setRegistrationSuccess(false);
    }
  };

  const handleSignUpClick = () => {
    navigate("/sign-in"); // Use navigate to go to the register page
  };

  return (
    <div className="flex justify-center items-center h-screen text-zinc-800 px-4">
      <div className="w-full max-w-sm bg-gradient-to-r from-blue-300 to-cyan-400 p-1 rounded-xl shadow-md">
        <form onSubmit={handleSignUp} className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
          {/* Email input */}
          <div className="mb-4">
            <input type="email" placeholder="Email" value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(""); // Reset the email error when user edits the field
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {emailError && <p className="text-red-500 text-xs italic mt-2">{emailError}</p>}
          </div>
          {/* Password input */}
           <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <FontAwesomeIcon
              icon={faEye}
              onClick={togglePasswordVisibility}
              className={`absolute inset-y-0 right-3 opacity-40 my-auto text-gray-400 hover:text-gray-600 cursor-pointer ${showPassword ? 'text-gray-600' : 'text-gray-400'}`}
            />
            {passwordError && <p className="text-red-500 text-xs italic mt-2">{passwordError}</p>}
          </div>
          {/* Sign up button */}
          <div className="flex items-center justify-between mb-4">
            <button type="submit" disabled={isRegistering}
              className="bg-gradient-to-r from-blue-300 to-cyan-400 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center items-center">
              {isRegistering ? (
                <Lottie options={defaultOptions} height={24} width={24} />
              ) : registrationSuccess ? (
                "Success! Redirecting..."
              ) : (
                "Sign up"
              )}
            </button>
          </div>
          {/* Divider */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex-grow border-t border-cyan-600"></div>
            <span className="flex-shrink mx-4 text-cyan-600 text-sm">OR</span>
            <div className="flex-grow border-t border-cyan-600"></div>
          </div>
          {/* Google sign up */}
          <button onClick={handleGoogleSignIn} type="button" disabled={isRegistering}
            className="bg-white border-2 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block w-full text-center flex justify-center items-center space-x-2">
            <img src={Google} alt="Google logo" className="h-6 mr-4" />
            <span>Sign up with Google</span>
          </button>
          <div className="flex flex-col mt-4 items-center w-full">
            <h2 className="justify-center text-sm text-cyan-500">Already got an account? <span className="font-semibold cursor-pointer underline"  onClick={handleSignUpClick}>Sign in!</span></h2>
          </div>
        </form>
        
      </div>
    </div>
  );
}

export default Register;
