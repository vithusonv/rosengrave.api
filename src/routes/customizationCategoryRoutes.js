const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/customizationCategoryController");

router.get("/", categoryController.getAllCategories);

router.get("/:categoryId", categoryController.getOneCategory);

router.post("/", categoryController.createNewCategory);

router.patch("/:categoryId", categoryController.updateOneCategory);

router.delete("/:categoryId", categoryController.deleteOneCategory);

module.exports = router;