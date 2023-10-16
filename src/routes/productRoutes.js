const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);

router.get("/:productId", productController.getOneProduct);

router.post("/", productController.createNewProduct);

router.patch("/:productId", productController.updateOneProduct);

router.delete("/:productId", productController.deleteOneProduct);

module.exports = router;