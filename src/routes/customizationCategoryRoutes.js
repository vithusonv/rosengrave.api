const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/customizationCategoryController");
const { newCategoryCheck } = require("../middleware/customization-validator");

router.get("/", categoryController.getAllCategories);

router.post("/", newCategoryCheck(), categoryController.createNewCategory);

router.patch("/:categoryId", categoryController.updateOneCategory);

router.delete("/:categoryId", categoryController.deleteOneCategory);

module.exports = router;