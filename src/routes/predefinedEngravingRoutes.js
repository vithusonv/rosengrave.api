const express = require("express");
const router = express.Router();
const upload = require('../middleware/multer'); // Import your multer middleware

const predefinedEngravingController = require("../controllers/predefinedEngravingController");
const { newEngravingCheck } = require("../middleware/predefined-engraving-validator");

router.get("/", predefinedEngravingController.getAllPredefinedEngravings);

router.post('/', upload.single('file'), predefinedEngravingController.createNewPredefinedEngraving)

module.exports = router;