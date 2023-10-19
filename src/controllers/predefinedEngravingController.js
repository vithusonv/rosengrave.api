const cloudinary = require('cloudinary').v2
const predefinedEngravingService = require("../services/predefinedEngravingService");

cloudinary.config({
    cloud_name: 'dirdbyito',
    api_key: '189198949246715',
    api_secret: 'r8ODiQ2xQSgdJUQ1laxfC8W45fM'
});

const getAllPredefinedEngravings = (req, res) => {
    predefinedEngravingService.getAllPredefEngravings()
        .then((engravings) => {
            res.status(200).json(engravings);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Internal server error.' });
            throw err;
        });
};

const createNewPredefinedEngraving = async (req, res) => {
    const { label, file } = req.body;

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64

    // Upload the image to Cloudinary
    cloudinary.uploader.upload(dataURI, {
        resource_type: 'auto',
        public_id: new Date(),
    })
        .then((d) => {
            console.log(d)
        })
        .catch((err) => {
            console.log(err);
        })

    // const imageUrl = cloudinaryResponse.secure_url;

    // console.log(req.body);
    // console.log(imageUrl);

    // TODO: check the validator
    predefinedEngravingService.createNewPredefEngraving(req.body)
        .then((engraving) => {
            res.status(200).json(engraving);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Internal server error.' });
            throw err;
        });
}

module.exports = {
    getAllPredefinedEngravings,
    createNewPredefinedEngraving,
};