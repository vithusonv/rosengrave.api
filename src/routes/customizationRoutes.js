const express = require("express");
const router = express.Router();

const customizationController = require("../controllers/customizationController");

router.get("/:productId", customizationController.getProductCustomizations);

router.get("/:productId/:categoryId", customizationController.getProductCustomizationByCategory);

module.exports = router;