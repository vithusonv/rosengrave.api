const express = require("express");
const router = express.Router();
const upload = require('../middleware/multer'); // Import your multer middleware

const engravingController = require("../controllers/engraving.controller");
const { newEngravingCheck } = require("../middleware/engraving-validator");

router.get("/", engravingController.getAllEngravings);

router.post('/', upload.single('file'), newEngravingCheck(), engravingController.createNewEngraving)

module.exports = router;