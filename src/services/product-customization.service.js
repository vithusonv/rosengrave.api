const customization = require("../models/product-customization.model");

const getProductCustomizations = (productId) => {
    return customization.getProductCustomizations(productId);
};

const getProductCustomizationsByCategory = (productId, categoryId) => {
    return customization.getProductCustomizationsByCategory(productId, categoryId);
};

const insertCustomizationOptForProduct = (product) => {
    return customization.insertCustomizationOptForProduct(product);
}

module.exports = {
    getProductCustomizations,
    getProductCustomizationsByCategory,
    insertCustomizationOptForProduct,
};