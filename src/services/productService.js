const product = require("../models/product");

const getAllProducts = () => {
    return product.getAllProducts();
};
  
const getOneProduct = (id) => {
    return product.getProductById(id);
};
  
const createNewProduct = () => {
    return;
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