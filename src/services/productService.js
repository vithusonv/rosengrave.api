const product = require("../models/product");

const getAllProducts = () => {
    return product.getAllProducts();
};

const getOneProduct = (id) => {
    return product.getProductById(id);
};

const createNewProduct = (obj) => {
    return product.createNewProduct(obj);
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