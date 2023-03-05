const express = require('express');
const router = express.Router()
const userController = require('../controllers/user')
const upload = require('../middlewares/upload')


router.get('/', userController.getDataUser)
router.get('/byemail/:email', userController.getByEmail)
// router.get('/:id', protect, userController.myRecipes)
router.post('/login', userController.login)
router.post('/register', userController.insertDataUser)
router.put('/forgotpassword/:email', userController.forgotPassword)
router.put('/resetpassword/:email', userController.resetPassword)
router.get('/:id', userController.profile)
router.put('/:id', upload.single('photo'), userController.updateDataUser)
router.delete('/:id', userController.deleteDataUser)

module.exports = router