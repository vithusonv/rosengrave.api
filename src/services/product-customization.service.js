const customization = require("../models/product-customization.model");

const getProductCustomizations = (productId) => {
    return customization.getProductCustomizations(productId);
};

const getProductCustomizationsByCategory = (productId, categoryId) => {
    return customization.getProductCustomizationsByCategory(productId, categoryId);
};

module.exports = {
    getProductCustomizations,
    getProductCustomizationsByCategory,
};