const customization = require("../models/customization");

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