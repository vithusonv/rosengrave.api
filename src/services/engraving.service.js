const engraving = require('../models/engraving.model');

const getAllPredefEngravings = () => {
    return engraving.getAllPredefEngravings();
};

const createNewPredefEngraving = (label, assetId, publicId, url, secureUrl) => {
    return engraving.createNewPredefEngraving(label, assetId, publicId, url, secureUrl);
};

module.exports = {
    getAllPredefEngravings,
    createNewPredefEngraving
}