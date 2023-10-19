const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const { newProductCheck } = require("../middleware/product-validator");

router.get("/", productController.getAllProducts);

router.get("/:productId", productController.getOneProduct);

router.post("/", newProductCheck(), productController.createNewProduct);

router.patch("/:productId", productController.updateOneProduct);

router.delete("/:productId", productController.deleteOneProduct);

module.exports = router;