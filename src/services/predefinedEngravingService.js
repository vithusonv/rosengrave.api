const predefinedEngraving = require('../models/predefinedEngraving');

const getAllPredefEngravings = () => {
    return predefinedEngraving.getAllPredefEngravings();
};

module.exports = {
    getAllPredefEngravings,
}