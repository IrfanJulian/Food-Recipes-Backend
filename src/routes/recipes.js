const express = require('express');
const router = express.Router()
const recipeController = require('../controllers/recipes');
const upload = require('../middlewares/upload');

router.get('/', recipeController.getDataRecipe)
router.post('/', upload.single('photo'), recipeController.insertDataRecipe)
router.delete('/:id', recipeController.deleteDataRecipe)


module.exports = router