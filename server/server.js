require('dotenv').config({path: '../env'});
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const { priceId, stripeCustomerId } = req.body; // Ensure you receive the stripeCustomerId

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer: stripeCustomerId, // Use the Stripe customer ID if available
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'subscription', // or 'payment' if it's a one-time payment
      success_url: 'http://localhost:3000/subscription-success',
      cancel_url: 'http://localhost:3000/pricing',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    res.status(500).json({ error: error.message });
  }
});

// Server side: Add this endpoint to your Express server
app.post('/create-portal-session', async (req, res) => {
  const { stripeCustomerId } = req.body; // Make sure you receive the Stripe customer ID from your client

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: 'http://localhost:3000/home',
    });

    res.json({ url: portalSession.url });
  } catch (error) {
    console.error("Error creating Stripe portal session:", error);
    res.status(500).json({ error: error.message });
  }
});


const port = 4242;
app.listen(port, () => console.log(`Server running on port ${port}`));
