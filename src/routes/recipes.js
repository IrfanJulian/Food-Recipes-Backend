const express = require('express');
const router = express.Router()
const recipeController = require('../controllers/recipes');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/upload')
// const upload = require('../middlewares/upload');

router.get('/', protect, recipeController.getDataRecipe)
router.get('/:id', protect, recipeController.getDetailRecipes)
router.post('/', protect, upload.single('photo'), recipeController.insertDataRecipe)
router.delete('/:id', protect, recipeController.deleteDataRecipe)


module.exports = router