const express = require('express');
const router = express.Router();
const userRouter = require('./user')
const recipeRouter = require('./recipes')
const communicationRouter = require('./communication')

router.use('/user', userRouter);
router.use('/recipe', recipeRouter);
router.use('/comment', communicationRouter)

module.exports = router;