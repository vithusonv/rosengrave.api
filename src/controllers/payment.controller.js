const stripe = require("stripe")(
  "sk_test_51OB6RJDweK0b9wbo0KxKUOe7rTfqWxn1wJUUK2Cp4jIulU21PT8U2ngUY73o9Yo9jEbNej0plliiMUInoZxnWc9e00owCyga6B"
); // move to strip config

const processPayment = async (req, res) => {};

const getIntent = async (req, res) => {
  try {
    const intent = await stripe.paymentIntents.create({
      amount: 1000, // adjust the amount according to your needs
      currency: "usd",
      // Other payment intent parameters...
    });

    res.json({ clientSecret: intent.client_secret });
  } catch (error) {
    console.error("Error creating Payment Intent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  processPayment,
  getIntent,
};
