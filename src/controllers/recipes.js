/* eslint-disable no-undef */
const { response } = require('../helpers/common');
const recipeModels = require('../models/recipes');
const upload = require('../helpers/cloudinary')

  const getDataRecipe = async(req,res) => {
    try {
        const search = req.query.search || '';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const offset = (page - 1) * limit || 0;
        const sortBy = req.query.sortBy || 'id';
        const sortList = req.query.sortList || 'asc';
        const { rows } = await recipeModels.getDataRecipe({search, page, limit, offset, sortBy, sortList})

        const {rows: [count]} = await recipeModels.countDataRecipe()
        const totalData = parseInt(count.total_products)
        const totalPage = Math.ceil(totalData / limit)
        const pagination = {
          currentPage: page,
          limit,
          totalData,
          totalPage
        }
        response(res, rows, 'success', 200, 'Get Data Recipe Success', pagination)
    } catch (error) {
        console.log(error);
        res.send({ message: 'error' })
    }
  }

  const myRecipe = async(req,res)=>{
    const id = req.params.id
    try {
      const {rows} = await recipeModels.myRecipe(id)
      response(res, rows, 'sucess', 200, 'get my recipe sucess');
    } catch (error) {
      res.json({message:'error', error})
    }
  }

  const getDetailRecipes = async(req,res) => {
    try {
      const id = req.params.id
      const {rows} = await recipeModels.getDetailRecipes(id)
      response(res, rows, 'suuccess', 200, 'Get Data by ID success')
    } catch (error) {
      console.log(error);
    }
  }

  const insertDataRecipe = async(req,res) => {
    try {
      const { userid, tittle, ingredients, description } = req.body
      const photo = req.file
      // console.log(req.file);
      // console.log('1', photo);
      const image = await upload(photo)
      const dataRecipe = { userid, tittle, ingredients, description, photo: image.secure_url}
      // console.log(dataRecipe);
      const result = await recipeModels.insertDataRecipe(dataRecipe)
      // console.log('2', photo);
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
    deleteDataRecipe,
    getDetailRecipes,
    myRecipe
  }