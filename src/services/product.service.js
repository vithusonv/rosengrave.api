const product = require("../models/product.model");

const getAllProducts = () => {
    return product.getAllProducts();
};

const getOneProduct = (id) => {
    return product.getProductById(id);
};

const createNewProduct = (prod, images) => {
    return product.createNewProduct(prod, images);
};

const updateOneProduct = () => {
    return;
};

const deleteOneProduct = () => {
    return;
};

module.exports = {
    getAllProducts,
    getOneProduct,
    createNewProduct,
    updateOneProduct,
    deleteOneProduct,
};