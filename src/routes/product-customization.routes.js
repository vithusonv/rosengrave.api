const express = require("express");
const router = express.Router();
const upload = require('../middleware/multer'); // Import your multer middleware


const customizationController = require("../controllers/product-customization.controller");
const { newProductCustomizationCheck } = require("../middleware/product-customization-validator");

router.get("/:productId", customizationController.getProductCustomizations);

router.get("/:productId/:categoryId", customizationController.getProductCustomizationByCategory);

router.post("/", upload.single('file'), newProductCustomizationCheck(), customizationController.insertCustomizationOptForProduct);

module.exports = router;