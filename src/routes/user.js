const express = require('express');
const router = express.Router()
const userController = require('../controllers/user')
const upload = require('../middlewares/upload')


router.get('/', userController.getDataUser)
router.post('/', upload.single('photo'), userController.insertDataUser)
router.put('/:id', userController.updateDataUser)
router.delete('/:id', userController.deleteDataUser)

module.exports = router