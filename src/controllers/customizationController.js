const customizationService = require('../services/customizationService');

const getProductCustomizations = (req, res) => {
    const productId = req.params.productId;

    customizationService.getProductCustomizations(productId)
    .then((customization) => {
        res.status(200).json(customization);
    })
    .catch((err) => {
        // Handle errors and send an appropriate response
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
        throw err;
    });
};

const getProductCustomizationByCategory = (req, res) => {
    const productId = req.params.productId;
    const categoryId = req.params.categoryId;

    customizationService.getProductCustomizationsByCategory(productId, categoryId)
    .then((customization) => {
        res.status(200).json(customization);
    })
    .catch((err) => {
        // Handle errors and send an appropriate response
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
        throw err;
    });
};


module.exports = {
    getProductCustomizations,
    getProductCustomizationByCategory
};