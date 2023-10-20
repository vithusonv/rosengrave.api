const predefinedEngravingService = require("../services/predefinedEngravingService");
const { validationResult } = require('express-validator');
const cloudinaryApi = require("../utils/cloudinary.util");

const getAllPredefinedEngravings = (req, res) => {
    predefinedEngravingService.getAllPredefEngravings()
        .then((engravings) => {
            res.status(200).json(engravings);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Internal server error.' });
            throw err;
        });
};

const createNewPredefinedEngraving = (req, res) => {
    const errors = validationResult(req);
 
    if (errors.isEmpty()) {

        // upload image to cloudinary
        cloudinaryApi(req.file, 'engravings')
        .then((cloudinaryRes) => {
            
            const { asset_id, public_id, url, secure_url } = cloudinaryRes;
            // store in db
            predefinedEngravingService.createNewPredefEngraving(req.body.label, asset_id, public_id, url, secure_url)
            .then((engraving) => {
                res.status(200).json(engraving);
            })
            .catch((err) => {
                res.status(500).json({ message: 'Internal server error.' });
                throw err;
            });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to upload image.' });
            throw err;
        });
    }
    else {
        res.status(422).json({ errors: errors.array() });
    }
}

module.exports = {
    getAllPredefinedEngravings,
    createNewPredefinedEngraving,
};