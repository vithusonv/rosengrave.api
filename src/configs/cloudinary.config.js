const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dirdbyito',
    api_key: '189198949246715',
    api_secret: 'r8ODiQ2xQSgdJUQ1laxfC8W45fM'
});

module.exports = cloudinary;