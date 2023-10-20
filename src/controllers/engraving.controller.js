const engravingService = require("../services/engraving.service");
const { validationResult } = require('express-validator');
const cloudinaryApi = require("../utils/cloudinary.util");

const getAllEngravings = (req, res) => {
    engravingService.getAllPredefEngravings()
        .then((engravings) => {
            res.status(200).json(engravings);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Internal server error.' });
        });
};

const createNewEngraving = (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        // upload image to cloudinary
        cloudinaryApi(req.file, 'engravings')
            .then((cloudinaryRes) => {
                const { asset_id, public_id, url, secure_url } = cloudinaryRes;
                // store in db
                engravingService.createNewPredefEngraving(req.body.label, asset_id, public_id, url, secure_url)
                    .then((engraving) => {
                        res.status(200).json(engraving);
                    })
                    .catch((err) => {
                        res.status(500).json({ message: 'Internal server error.' });
                    });
            })
            .catch((err) => {
                res.status(500).json({ message: 'Failed to upload image.' });
            });
    }
    else {
        res.status(422).json({ errors: errors.array() });
    }
}

module.exports = {
    getAllEngravings,
    createNewEngraving,
};