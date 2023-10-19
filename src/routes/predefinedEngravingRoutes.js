const express = require("express");
const router = express.Router();

const Multer = require("multer");
const storage = new Multer.memoryStorage();
const upload = Multer({
    storage,
});


const predefinedEngravingController = require("../controllers/predefinedEngravingController");
const { newEngravingCheck } = require("../middleware/predefined-engraving-validator");

router.get("/", predefinedEngravingController.getAllPredefinedEngravings);

router.post('/', predefinedEngravingController.createNewPredefinedEngraving)

module.exports = router;