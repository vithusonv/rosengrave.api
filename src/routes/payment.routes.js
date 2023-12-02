const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/payment.controller");

router.post("/", paymentController.createIntent);

router.put("/", paymentController.updateIntent);

module.exports = router;
