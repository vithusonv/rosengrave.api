const predefinedEngraving = require('../models/predefinedEngraving');

const getAllPredefEngravings = () => {
    return predefinedEngraving.getAllPredefEngravings();
};

const createNewPredefEngraving = (label, assetId, publicId, url, secureUrl) => {
    return predefinedEngraving.createNewPredefEngraving(label, assetId, publicId, url, secureUrl);
};

module.exports = {
    getAllPredefEngravings,
    createNewPredefEngraving
}