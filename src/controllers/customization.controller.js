const customizationService = require('../services/customization.service');
const { validationResult } = require('express-validator');

const getAllCustomizations = (req, res) => {
    customizationService.getAllCustomizations()
        .then((categories) => {
            res.status(200).json(categories);
        })
        .catch((err) => {
            // Handle errors and send an appropriate response
            console.error(err);
            res.status(500).json({ message: 'Internal server error.' });
        })
};

const createNewCategory = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        customizationService.createNewCustomization(req.body.category)
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
    getAllCustomizations,
    createNewCategory,
    updateOneCategory,
    deleteOneCategory,
};