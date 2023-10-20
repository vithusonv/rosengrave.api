const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/customization.controller");
const { newCustomizationCheck } = require("../middleware/customization-validator");

router.get("/", categoryController.getAllCustomizations);

router.post("/", newCustomizationCheck(), categoryController.createNewCategory);

router.patch("/:categoryId", categoryController.updateOneCategory);

router.delete("/:categoryId", categoryController.deleteOneCategory);

module.exports = router;