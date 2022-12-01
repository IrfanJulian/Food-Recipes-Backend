const express = require('express');
const router = express.Router();
const userRouter = require('./user')
const recipeRouter = require('./recipes')

router.use('/user', userRouter);
router.use('/recipe', recipeRouter);

module.exports = router;