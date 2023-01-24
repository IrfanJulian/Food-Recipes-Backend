const express = require('express');
const router = express.Router()
const communicationController = require('../controllers/communication');
const { protect } = require('../middlewares/auth');

router.get('/', communicationController.getCommentAll)
router.get('/:id', communicationController.getDetailComment)
router.post('/', protect, communicationController.postComment)



module.exports = router