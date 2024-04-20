import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import LandingPage from './components/landing/LandingPage';
import Register from './components/register/Register';
import Pricing from './components/register/Pricing';
import SignIn from './components/register/SignIn';
import Dashboard from './components/dashboard/dashboard';
import CheckoutForm from './components/register/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SubscriptionSuccess from './components/register/SubscriptionSuccess';
import Loader from "./components/Loader";

const stripePromise = loadStripe('your_stripe_public_key');

function App() {
  return (
    <AuthProvider>  {/* Move AuthProvider here to wrap everything */}
      <Router>
        <AppInner /> {/* Move the rest of your app logic to a new component */}
      </Router>
    </AuthProvider>
  );
}

function AppInner() {

  return (
    <div className='bg-white dark:bg-white font-montserrat w-full'>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/home" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/subscription-success" element={<ProtectedRoute><SubscriptionSuccess /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
}

function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default App;
