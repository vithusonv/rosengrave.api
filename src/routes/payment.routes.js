const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/payment.controller");

router.post("/", paymentController.processPayment);

router.get("/", paymentController.getIntent);

module.exports = router;
