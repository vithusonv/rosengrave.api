const express = require("express");
const router = express.Router();

const predefinedEngravingController = require("../controllers/predefinedEngravingController");

router.get("/", predefinedEngravingController.getAllPredefinedEngravings);

module.exports = router;