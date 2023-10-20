const category = require('../models/category.model');

const getAllCategories = () => {
    return category.getAllCategories();
}

const createNewCategory = (newCategory) => {
    return category.createNewCategory(newCategory);
}

module.exports = {
    getAllCategories,
    createNewCategory,
}