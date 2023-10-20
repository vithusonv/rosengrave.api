const express = require("express");
const router = express.Router();
const upload = require('../middleware/multer');

const categoryController = require("../controllers/category.controller");
const { newCategoryCheck } = require("../middleware/category-validator");

router.get("/", categoryController.getAllCategories);

router.post("/", upload.single('file'), newCategoryCheck(), categoryController.createNewCategory);

module.exports = router;