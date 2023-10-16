const customizationCategory = require('../models/customizationCategory');

const getAllCustomizationCategories = () => {
    return customizationCategory.getAllCustomizationCategories();
};

module.exports = {
    getAllCustomizationCategories,
}