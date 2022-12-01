/* eslint-disable no-undef */
const { response } = require('../helpers/common');
const recipeModels = require('../models/recipes');
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });

  const getDataRecipe = async(req,res) => {
    try {
        const { rows } = await recipeModels.getDataRecipe()
        response(res, rows, 'success', 200, 'Add Recipe Success')
    } catch (error) {
        console.log(error);
        res.send({ message: 'error' })
    }
  }

  const insertDataRecipe = async(req,res) => {
    try {
      const { userID, name, tittle, ingredients } = req.body
      const photo = req.file
      const image = await cloudinary.uploader.upload(photo.path, { folder: 'Recipes/Food/Image' })
      const dataRecipe = { userID, name, tittle, ingredients, photo: [image.secure_url] }
      const result = await recipeModels.insertDataRecipe(dataRecipe)
      response(res, result.data, 'success', 200, 'Insert Data Success')
    } catch (error) {
      console.log(error);
      res.send({message: 'error'})
    }
  }

  const deleteDataRecipe = async(req,res) => {
    try {
      const id = req.params.id
      const result = await recipeModels.deleteDataRecipe(id)
      response(res, result.data, 'success', 200, 'Delete Data Success')
    } catch (error) {
      console.log(error);
      res.send({message: 'error'})
    }
  }

  module.exports = {
    getDataRecipe,
    insertDataRecipe,
    deleteDataRecipe
  }