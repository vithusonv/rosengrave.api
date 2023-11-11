const axios = require("axios");

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

module.exports = {
  processPayment,
};
