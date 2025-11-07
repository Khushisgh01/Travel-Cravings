// NOTE: This file assumes you have run 'npm install cloudinary multer-storage-cloudinary'
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Use environment variables loaded by dotenv in app.js
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'TravelCravings_Dev', // Folder name where images will be stored
        allowed_formats: ['jpeg', 'png', 'jpg'],
    },
});

module.exports = {
    cloudinary,
    storage
}