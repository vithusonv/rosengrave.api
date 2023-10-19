const predefinedEngraving = require('../models/predefinedEngraving');

const getAllPredefEngravings = () => {
    return predefinedEngraving.getAllPredefEngravings();
};

const createNewPredefEngraving = (engraving) => {
    return predefinedEngraving.createNewPredefEngraving(engraving);
};

module.exports = {
    getAllPredefEngravings,
    createNewPredefEngraving
}