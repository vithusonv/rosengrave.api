const productService = require('../services/product.service');
const { validationResult } = require('express-validator');
const cloudinaryApi = require("../utils/cloudinary.util");
const { v4: uuidv4 } = require('uuid');

const getAllProducts = (req, res) => {
    productService.getAllProducts()
        .then((products) => {
            res.status(200).json(products);
        })
        .catch((err) => {
            // Handle errors and send an appropriate response
            console.error(err);
            res.status(500).json({ message: 'Internal server error.' });
        })
};

const getOneProduct = (req, res) => {
    const id = req.params.productId;

    productService.getOneProduct(id)
        .then((product) => {
            if (product) {
                res.status(200).json(product);
            } else {
                // Send a not found response with a status code of 404
                res.status(404).json({ message: 'Product not found.' });
            }
        })
        .catch((err) => {
            // Handle errors and send an appropriate response
            console.log(err);
            res.status(500).json({ message: 'Internal server error.' });
        });
};

const createNewProduct = (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        // upload image to cloudinary
        cloudinaryApi(req.file, 'products')
            .then((cloudinaryRes) => {
                const { asset_id, public_id, url, secure_url } = cloudinaryRes;
                req.body.unique_code = uuidv4();

                productService.createNewProduct(req.body, { asset_id, public_id, url, secure_url })
                    .then((newProduct) => {
                        if (newProduct) {
                            res.status(200).json(req.body);
                        }
                        else {
                            res.status(404).json();
                        }
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
};

const updateOneProduct = (req, res) => {
    const updateProduct = productService.updateOneProduct();
    res.send("Update an existing product");
};

const deleteOneProduct = (req, res) => {
    const deleteProduct = productService.deleteOneProduct();
    res.send("Delete an existing product");
};

module.exports = {
    getAllProducts,
    getOneProduct,
    createNewProduct,
    updateOneProduct,
    deleteOneProduct,
};