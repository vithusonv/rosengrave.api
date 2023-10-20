const productCategoryService = require('../services/product-category.service');

const getCategoryProducts = (req, res) => {
    productCategoryService.getCategoryProducts()
        .then((category) => {
            res.status(200).json(category);
        })
        .catch((err) => {
            // Handle errors and send an appropriate response
            res.status(500).json({ message: 'Internal server error.' });
        });
};

const insertProductInCategory = (req, res) => {
    productCategoryService.insertProductInCategory(req.body.productId, req.body.categoryId)
        .then((category) => {
            res.status(200).json(category);
        })
        .catch((err) => {
            // Handle errors and send an appropriate response
            res.status(500).json({ message: 'Internal server error.' });
        });
};

module.exports = {
    getCategoryProducts,
    insertProductInCategory,
};