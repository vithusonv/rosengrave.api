const stripe = require("stripe")(
  "sk_test_51OB6RJDweK0b9wbo0KxKUOe7rTfqWxn1wJUUK2Cp4jIulU21PT8U2ngUY73o9Yo9jEbNej0plliiMUInoZxnWc9e00owCyga6B"
); // move to strip config

const createIntent = async (req, res) => {
  const { amount } = req.body;
  const cents = Math.round((Math.abs(amount) / 100) * 10000); // stripe accepts amount in cents

  try {
    const intent = await stripe.paymentIntents.create({
      amount: Math.max(50, cents), // round amount, ensure it's a minimum of 50. Value is in cents, stripe requires 50 cents minimum
      currency: "cad",
      payment_method_types: ["card"],
      // Other payment intent parameters...
    });

    res.json({
      clientSecret: intent.client_secret,
      paymentIntentId: intent.id,
    });
  } catch (error) {
    console.error("Error creating Payment Intent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateIntent = async (req, res) => {
  const { amount, paymentIntentId } = req.body;
  const cents = Math.round((Math.abs(amount) / 100) * 10000); // stripe accepts amount in cents

  try {
    const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
      amount: cents, // value in cents
    });
    res.json({ success: true, paymentIntent });
  } catch (error) {
    console.error("Error updating Payment Intent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createIntent,
  updateIntent,
};
