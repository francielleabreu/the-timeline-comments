const express = require('express'); 
const router = express.Router();
const controller = require('../controllers/controller'); 

router.get('/', controller.getMessages);
router.post('/', controllerAPI.saveMessage);

module.exports = router;