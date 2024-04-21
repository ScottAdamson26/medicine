const functions = require("firebase-functions");
const cors = require("cors")({ origin: true }); // Set up CORS to allow all origins
const stripe = require("stripe")(functions.config().stripe.secret);

exports.createCheckoutSession = functions.https.onRequest((req, res) => {
  // Bypass CORS by setting headers explicitly for preflight requests
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    // Handle the actual POST request
    cors(req, res, async () => {
      if (req.method !== "POST") {
        return res.status(405).send("Method Not Allowed");
      }

      const { priceId, stripeCustomerId } = req.body;

      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          customer: stripeCustomerId,
          line_items: [{
            price: priceId,
            quantity: 1
          }],
          mode: "subscription",
          success_url: `${req.headers.origin}/subscription-success`,
          cancel_url: `${req.headers.origin}/pricing`
        });

        res.status(200).json({ url: session.url });
      } catch (error) {
        console.error("Error creating Stripe checkout session:", error);
        res.status(500).json({ error: error.message });
      }
    });
  }
});

exports.createPortalSession = functions.https.onRequest((req, res) => {
  // Handle CORS for Portal Session the same way
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    cors(req, res, async () => {
      if (req.method !== "POST") {
        return res.status(405).send("Method Not Allowed");
      }

      const { stripeCustomerId } = req.body;

      try {
        const portalSession = await stripe.billingPortal.sessions.create({
          customer: stripeCustomerId,
          return_url: `${req.headers.origin}/home`
        });

        res.status(200).json({ url: portalSession.url });
      } catch (error) {
        console.error("Error creating Stripe portal session:", error);
        res.status(500).json({ error: error.message });
      }
    });
  }
});
