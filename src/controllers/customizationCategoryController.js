const customizationCategoryService = require('../services/customizationCategoryService');
const { validationResult } = require('express-validator');

const getAllCategories = (req, res) => {
    customizationCategoryService.getAllCustomizationCategories()
        .then((categories) => {
            res.status(200).json(categories);
        })
        .catch((err) => {
            // Handle errors and send an appropriate response
            console.error(err);
            res.status(500).json({ message: 'Internal server error.' });
            throw err;
        })
};

const createNewCategory = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        customizationCategoryService.createNewCategory(req.body.category)
            .then((category) => {
                if (category) {
                    res.status(200).json(category);
                }
                else {
                    res.status(404).json();
                }
            })
            .catch((err) => {
                res.status(500).json({ message: 'Internal server error.' });
                throw err;
            });
    }
    else {
        res.status(422).json({ errors: errors.array() });
    }
};

const updateOneCategory = (req, res) => {
    res.send("Update an existing Category");
};

const deleteOneCategory = (req, res) => {
    res.send("Delete an existing Category");
};

module.exports = {
    getAllCategories,
    createNewCategory,
    updateOneCategory,
    deleteOneCategory,
};