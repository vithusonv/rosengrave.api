const customizationCategory = require('../models/customizationCategory');

const getAllCustomizationCategories = () => {
    return customizationCategory.getAllCustomizationCategories();
};

const createNewCategory = (name) => {
    return customizationCategory.createNewCustomCategory(name);
};

module.exports = {
    getAllCustomizationCategories,
    createNewCategory
}