const predefinedEngravingService = require("../services/predefinedEngravingService");

const getAllPredefinedEngravings = (req, res) => {
    predefinedEngravingService.getAllPredefEngravings()
    .then((engravings) => {
        res.status(200).json(engravings);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Internal server error.' });
    });
};

module.exports = {
    getAllPredefinedEngravings,
};