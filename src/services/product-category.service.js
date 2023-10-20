const productCategory = require("../models/product-category.model");

const getCategoryProducts = () => {
    return productCategory.getCategoryProducts();
};

const insertProductInCategory = (productId, categoryId) => {
    return productCategory.insertProductInCategory(productId, categoryId);
}

module.exports = {
    getCategoryProducts,
    insertProductInCategory
};