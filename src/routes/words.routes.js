var express = require('express');
const router = express.Router();
const controller = require('../controllers/word.controller');
const authentication = require('../middleware/authenticator.middleware');

router.use(authentication.authenticate);
router.post('/', controller.create);
router.get('/:difficulty', controller.getWord);

module.exports = router;
