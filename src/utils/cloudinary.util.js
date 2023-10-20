const cloudinary = require('../configs/cloudinary.config');

const cloudinaryApi = (file, folder) => {
    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;

    // Upload the image to Cloudinary
    return cloudinary.uploader.upload(dataURI, {
        folder: folder,
        resource_type: 'auto',
    });
}

module.exports = cloudinaryApi;