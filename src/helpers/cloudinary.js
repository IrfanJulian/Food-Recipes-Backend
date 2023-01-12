/* eslint-disable no-undef */
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });

const upload = async(file) => {
    // console.log(file);
    if (file.mimetype === 'video/mp4'){
        const video = await cloudinary.uploader.upload(file.path, { folder: 'Recipes/Food', resource_type: 'video' })
        return video
    } else {
        const image = await cloudinary.uploader.upload(file.path, { folder: 'Recipes/Food' })
        return image
    }
}

module.exports = upload