const axios = require("axios");
const stripe = require("stripe")(
  "sk_test_51OB6RJDweK0b9wbo0KxKUOe7rTfqWxn1wJUUK2Cp4jIulU21PT8U2ngUY73o9Yo9jEbNej0plliiMUInoZxnWc9e00owCyga6B"
);

const processPayment = async (res, req) => {
  const { nonce, amount } = req.body;

  try {
    const response = await axios.post(
      "https://connect.squareupsandbox.com/v2/locations/YOUR_LOCATION_ID/transactions",
      {
        source_id: nonce,
        amount_money: {
          amount: amount,
          currency: "CAD",
        },
        idempotency_key: `${Math.random()}`,
      },
      {
        headers: {
          Authorization: `Bearer YOUR_ACCESS_TOKEN`,
          "Content-Type": "application/json",
        },
      }
    );

    // Handle success
    console.log("Payment successful:", response.data);
    res.json({ success: true, message: "Payment successful" });
  } catch (error) {
    // Handle error
    console.error("Payment error:", error.response.data);
    res.status(500).json({ success: false, message: "Payment failed" });
  }
};

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
