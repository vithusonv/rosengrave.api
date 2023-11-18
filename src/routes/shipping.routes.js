const express = require("express");
const router = express.Router();

const shippingController = require("../controllers/shipping.controller");

router.post("/rates", shippingController.getShippingRates);

module.exports = router;
