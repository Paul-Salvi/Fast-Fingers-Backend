var express = require('express');
const router = express.Router();
const settingController = require('../controllers/setting.controller');
const authentication = require('../middleware/authenticator.middleware');

router.use(authentication.authenticate);
router.get('/', settingController.getAll);
router.post('/', settingController.create);
router.get('/:name', settingController.getSetting);

module.exports = router;
