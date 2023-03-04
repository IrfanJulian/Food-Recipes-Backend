const express = require('express');
const router = express.Router()
const recipeController = require('../controllers/recipes');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/upload')

router.get('/', recipeController.getDataRecipe)
router.get('/:id', recipeController.getDetailRecipes)
router.get('/myrecipe/:id', recipeController.myRecipe)
router.post('/', upload.single('photo'), recipeController.insertDataRecipe)
router.delete('/:id', protect, recipeController.deleteDataRecipe)


module.exports = router