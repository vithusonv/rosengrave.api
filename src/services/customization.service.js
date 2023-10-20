const customizationCategory = require('../models/customization.model');

const getAllCustomizations = () => {
    return customizationCategory.getAllCustomizations();
};

const createNewCustomization = (name) => {
    return customizationCategory.createNewCustomization(name);
};

module.exports = {
    getAllCustomizations,
    createNewCustomization
}