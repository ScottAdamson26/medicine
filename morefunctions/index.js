const functions = require("firebase-functions");
const cors = require("cors")({origin: true});
const stripe = require("stripe")(functions.config().stripe.secret_key);

exports.createCheckoutSession = functions.https.onRequest((req, res) => {
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
            success_url: "http://localhost:3000/subscription-success",
            cancel_url: "http://localhost:3000/pricing"
          });
          

      res.status(200).json({url: session.url});
    } catch (error) {
      console.error("Error creating Stripe checkout session:", error);
      res.status(500).json({error: error.message});
    }
  });
});

exports.createPortalSession = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const { stripeCustomerId } = req.body;

    try {
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: stripeCustomerId,
            return_url: "http://localhost:3000/home"
          });

      res.status(200).json({url: portalSession.url});
    } catch (error) {
      console.error("Error creating Stripe portal session:", error);
      res.status(500).json({error: error.message});
    }
  });
});
