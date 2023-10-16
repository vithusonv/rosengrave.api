const customizationCategoryService = require('../services/customizationCategoryService');

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

const getOneCategory = (req, res) => {
    res.send("Get an existing Category");
};

const createNewCategory = (req, res) => {
    res.send("Create a new Category");
};

const updateOneCategory = (req, res) => {
    res.send("Update an existing Category");
};

const deleteOneCategory = (req, res) => {
    res.send("Delete an existing Category");
};

module.exports = {
    getAllCategories,
    getOneCategory,
    createNewCategory,
    updateOneCategory,
    deleteOneCategory,
};