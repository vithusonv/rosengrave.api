const categoryService = require('../services/category.service');
const { validationResult } = require('express-validator');
const cloudinaryApi = require("../utils/cloudinary.util");

const getAllCategories = (req, res) => {
    categoryService.getAllCategories()
        .then((categories) => {
            res.status(200).json(categories);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Internal server error.' });
        });
};

const createNewCategory = async (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {

        let category = {};

        if (req.file) {
            // Upload image to Cloudinary
            const cloudinaryRes = await cloudinaryApi(req.file, 'categories');
            const { asset_id, public_id, url, secure_url } = cloudinaryRes;

            // Store image information in the category object
            category = {
                ...req.body,
                image: { asset_id, public_id, url, secure_url },
            };
        } else {
            // If no image is uploaded, just use the request body
            category = req.body;
        }

        // store in db
        categoryService.createNewCategory(category)
            .then((category) => {
                res.status(200).json(category);
            })
            .catch((err) => {
                res.status(500).json({ message: 'Internal server error.' });
            });
    }
    else {
        res.status(422).json({ errors: errors.array() });
    }
};

module.exports = {
    getAllCategories,
    createNewCategory
}