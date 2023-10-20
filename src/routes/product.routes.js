const express = require("express");
const router = express.Router();
const upload = require('../middleware/multer'); // Import your multer middleware

const productController = require("../controllers/product.controller");
const { newProductCheck } = require("../middleware/product-validator");

router.get("/", productController.getAllProducts);

router.get("/:productId", productController.getOneProduct);

router.post("/", upload.single('file'), newProductCheck(), productController.createNewProduct);

router.patch("/:productId", productController.updateOneProduct);

router.delete("/:productId", productController.deleteOneProduct);

module.exports = router;