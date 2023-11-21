const axios = require("axios");
const xml2js = require("xml2js");
const parser = new xml2js.Parser();
const {
  ADDITIONAL_CHARGE_PER_PRODUCT,
  ORIGIN_POSTAL_CODE,
} = require("../configs/shipping.config");

const getShippingRates = async (req, res) => {
  const { destination, parcel, totalItems } = req.body;

  // Validate input data
  if (!destination || !parcel) {
    return res.status(400).send("Invalid input data");
  }

  // Create a Set for unique products
  const uniqueProducts = new Set();
  const uniqueParcels = [];

  parcel.forEach((product) => {
    if (!uniqueProducts.has(product.product_id)) {
      uniqueProducts.add(product.product_id);
      uniqueParcels.push(product);
    }
  });

  const createParcelXML = (product) => {
    return `
      <mailing-scenario xmlns="http://www.canadapost.ca/ws/ship/rate-v4">
        <customer-number>${process.env.CANADA_POST_CUSTOMER_NUMBER}</customer-number>
        <origin-postal-code>${ORIGIN_POSTAL_CODE}</origin-postal-code>
        <destination>
          <domestic>
            <postal-code>${destination.postalCode}</postal-code>
          </domestic>
        </destination>
        <parcel-characteristics>
          <weight>${product.product_dimensions.weight}</weight>
          <dimensions>
            <length>${product.product_dimensions.length}</length>
            <width>${product.product_dimensions.width}</width>
            <height>${product.product_dimensions.height}</height>
          </dimensions>
        </parcel-characteristics>
      </mailing-scenario>
    `;
  };

  const requests = uniqueParcels.map((product) => {
    const xmlRequest = createParcelXML(product);
    return axios
      .post(process.env.CANADA_POST_ENDPOINT, xmlRequest, {
        auth: {
          username: process.env.CANADA_POST_API_USERNAME,
          password: process.env.CANADA_POST_API_PASSWORD,
        },
        headers: {
          "Content-Type": "application/vnd.cpc.ship.rate-v4+xml",
          Accept: "application/vnd.cpc.ship.rate-v4+xml",
        },
      })
      .then((response) => {
        // Parse the XML response to JSON
        return parser.parseStringPromise(response.data);
      })
      .catch((error) => ({ error: error.message }));
  });

  const extractDOMRPServiceDueAmounts = (rateResponses) => {
    return rateResponses.flatMap((response) => {
      // Check if the response is fulfilled and has necessary data
      if (
        response.status === "fulfilled" &&
        response.value &&
        response.value["price-quotes"] &&
        response.value["price-quotes"]["price-quote"]
      ) {
        return response.value["price-quotes"]["price-quote"]
          .filter(
            (quote) =>
              quote["service-code"] && quote["service-code"].includes("DOM.RP")
          )
          .flatMap((quote) => quote["price-details"])
          .map((priceDetail) => priceDetail["due"]);
      } else {
        return []; // Return an empty array if the required data is missing
      }
    });
  };

  try {
    const responses = await Promise.allSettled(requests);
    const successfulResponses = responses.filter(
      (response) => response.status === "fulfilled"
    );

    if (successfulResponses.length === 0) {
      return res.status(500).send("No successful rate fetches");
    }

    const dueAmountsForDOMRPService =
      extractDOMRPServiceDueAmounts(successfulResponses);
    const highestDueAmount =
      dueAmountsForDOMRPService.length > 0
        ? Math.max(...dueAmountsForDOMRPService)
        : 0;

    // Calculate the total additional charge for other products
    const additionalCharge = (totalItems - 1) * ADDITIONAL_CHARGE_PER_PRODUCT; // Subtract 1 for the product already accounted for in highestDueAmount
    const totalShippingCost = highestDueAmount + additionalCharge;

    res.json({ totalShippingCost });
  } catch (error) {
    console.error("Error fetching rates:", error);
    res.status(500).send("Error occurred");
  }
};

module.exports = {
  getShippingRates,
};
