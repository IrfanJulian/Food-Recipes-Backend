const express = require('express');
const router = express.Router()
const communicationController = require('../controllers/communication');

router.get('/', communicationController.getCommentAll)
router.get('/:id', communicationController.getDetailComment)
router.post('/', communicationController.postComment)



module.exports = router