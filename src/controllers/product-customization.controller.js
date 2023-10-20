const productCustomizationService = require('../services/product-customization.service');

const getProductCustomizations = (req, res) => {
    const productId = req.params.productId;

    productCustomizationService.getProductCustomizations(productId)
        .then((customization) => {
            res.status(200).json(customization);
        })
        .catch((err) => {
            // Handle errors and send an appropriate response
            console.error(err);
            res.status(500).json({ message: 'Internal server error.' });
        });
};

const getProductCustomizationByCategory = (req, res) => {
    const productId = req.params.productId;
    const categoryId = req.params.categoryId;

    productCustomizationService.getProductCustomizationsByCategory(productId, categoryId)
        .then((customization) => {
            res.status(200).json(customization);
        })
        .catch((err) => {
            // Handle errors and send an appropriate response
            console.error(err);
            res.status(500).json({ message: 'Internal server error.' });
        });
};


module.exports = {
    getProductCustomizations,
    getProductCustomizationByCategory
};