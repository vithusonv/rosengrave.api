const productCustomizationService = require('../services/product-customization.service');
const { validationResult } = require('express-validator');
const cloudinaryApi = require("../utils/cloudinary.util");

const getProductCustomizations = (req, res) => {
    const productId = req.params.productId;

    productCustomizationService.getProductCustomizations(productId)
        .then((customization) => {
            res.status(200).json(customization);
        })
        .catch((err) => {
            // Handle errors and send an appropriate response
            console.error(err);
            res.status(500).json({ message: 'Internal server error.' });
        });
};

const getProductCustomizationByCategory = (req, res) => {
    const productId = req.params.productId;
    const categoryId = req.params.categoryId;

    productCustomizationService.getProductCustomizationsByCategory(productId, categoryId)
        .then((customization) => {
            res.status(200).json(customization);
        })
        .catch((err) => {
            // Handle errors and send an appropriate response
            console.error(err);
            res.status(500).json({ message: 'Internal server error.' });
        });
};

const insertCustomizationOptForProduct = async (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {

        let product = {};

        if (req.file) {
            // Upload image to Cloudinary
            const cloudinaryRes = await cloudinaryApi(req.file, 'product-customization');
            const { asset_id, public_id, url, secure_url } = cloudinaryRes;

            // Store image information in the product object
            product = {
                ...req.body,
                image: { asset_id, public_id, url, secure_url },
            };
        } else {
            // If no image is uploaded, just use the request body
            product = req.body;
        }

        productCustomizationService.insertCustomizationOptForProduct(product)
            .then((custom) => {
                res.status(200).json(custom);
            })
            .catch((err) => {
                // Handle errors and send an appropriate response
                console.error(err);
                res.status(500).json({ message: 'Internal server error.' });
            });
    }
    else {
        res.status(422).json({ errors: errors.array() });
    }
}


module.exports = {
    getProductCustomizations,
    getProductCustomizationByCategory,
    insertCustomizationOptForProduct
};