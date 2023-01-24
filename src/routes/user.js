const express = require('express');
const router = express.Router()
const userController = require('../controllers/user')
const upload = require('../middlewares/upload')
const { protect } = require('../middlewares/auth')


router.get('/', userController.getDataUser)
// router.get('/:id', protect, userController.myRecipes)
router.post('/login', userController.login)
router.post('/register', upload.single('photo'), userController.insertDataUser)
router.get('/profile', userController.profile)
router.put('/:id', protect, upload.single('photo'), userController.updateDataUser)
router.delete('/:id', userController.deleteDataUser)

module.exports = router