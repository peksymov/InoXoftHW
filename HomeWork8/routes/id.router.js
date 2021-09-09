const router = require('express').Router();
const idController = require('../controllers/id.controller');

router.get('/', idController.getUserById);

module.exports = router;
