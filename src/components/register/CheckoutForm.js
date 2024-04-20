import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const sessionId = location.state?.sessionId;  // Retrieve the sessionId passed from Pricing

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const {error, token} = await stripe.createToken(card);

    if (error) {
      console.log(error.message);
    } else {
      console.log(token);
      // Since sessionId is already created, redirect the customer to Stripe's hosted checkout page:
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
}

export default CheckoutForm;
