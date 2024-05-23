const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const stripe = require("stripe")(functions.config().stripe.secret);

admin.initializeApp();

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
          cancel_url: `${req.headers.origin}/pricing`,
          payment_method_collection: 'if_required',
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

exports.deleteUserData = functions.region('us-central1').https.onRequest((req, res) => {
  // Handle CORS for deleteUserData
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

      const { uid } = req.body;

      if (!uid) {
        return res.status(400).json({ error: "User ID is required." });
      }

      try {
        // Delete user's document from "users" collection
        const userDocRef = admin.firestore().collection('users').doc(uid);
        await deleteSubcollections(userDocRef);
        await userDocRef.delete();

        // Delete user's document from "userProgress" collection
        const userProgressDocRef = admin.firestore().collection('userProgress').doc(uid);
        await userProgressDocRef.delete();

        // Delete user's authentication record
        await admin.auth().deleteUser(uid);

        res.status(200).json({ message: 'User account deleted successfully' });
      } catch (error) {
        console.error("Failed to delete account:", error);
        res.status(500).json({ error: 'Failed to delete account.' });
      }
    });
  }
});

async function deleteSubcollections(docRef) {
  const subcollections = await docRef.listCollections();
  for (const subcollection of subcollections) {
    const docs = await subcollection.listDocuments();
    for (const doc of docs) {
      await doc.delete();
    }
  }
}
