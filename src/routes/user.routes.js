var express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authentication = require('../middleware/authenticator.middleware');

router.post('/', userController.createUser);

// router.use(authentication.authenticate);
router.post('/scores', userController.saveUserScore);
router.get('/scores', userController.getUserScores);
 
module.exports = router;
