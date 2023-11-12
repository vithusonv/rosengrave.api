const stripe = require("stripe")(
  "sk_test_51OB6RJDweK0b9wbo0KxKUOe7rTfqWxn1wJUUK2Cp4jIulU21PT8U2ngUY73o9Yo9jEbNej0plliiMUInoZxnWc9e00owCyga6B"
);

const shippo = require("shippo")(
  "shippo_test_a699af57756ee577f123c3386eb8f497c20ec869"
);

const axios = require("axios");
const xml2js = require("xml2js");

const processPayment = async (req, res) => {
  // Replace with your Canada Post API username and password
  const username = "c7dfb0f2ca72ff2c";
  const password = "3bbd816c6601515785c3d0";

  // Canada Post API endpoint for rate calculation
  const endpoint = "https://ct.soa-gw.canadapost.ca/rs/ship/price";

  // Example request data in XML format
  const xmlRequest = `
  <mailing-scenario xmlns="http://www.canadapost.ca/ws/ship/rate-v4">
  <customer-number>0006008652</customer-number>
  <parcel-characteristics>
    <weight>1</weight>
    <dimensions>
      <length>20</length>
      <width>15</width>
      <height>10</height>
    </dimensions>
  </parcel-characteristics>
  <origin-postal-code>K2B8J6</origin-postal-code>
  <destination>
    <domestic>
      <postal-code>J0E1P0</postal-code>
    </domestic>
  </destination>
</mailing-scenario>`;

  const config = {
    auth: {
      username: username,
      password: password,
    },
    headers: {
      "Content-Type": "application/vnd.cpc.ship.rate-v4+xml",
      Accept: "application/vnd.cpc.ship.rate-v4+xml",
    },
  };

  axios
    .post(endpoint, xmlRequest, config)
    .then((response) => {
      // Convert XML response to JS object
      xml2js.parseStringPromise(response.data).then((result) => {
        res.json(result);
        console.log(result);
        // Process the result here
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  // shipment
  //   .save()
  //   .then((s) => {
  //     s.getRates()
  //       .then((rates) => {
  //         rates.forEach((rate) => {
  //           console.log(
  //             `Carrier: ${rate.carrier}, Service: ${rate.service}, Rate: ${rate.rate}`
  //           );
  //         });
  //       })
  //       .catch((error) => {
  //         console.error("Error getting rates:", error);
  //       });
  //   })
  //   .catch((error) => {
  //     console.error("Error saving shipment:", error);
  //   });
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
