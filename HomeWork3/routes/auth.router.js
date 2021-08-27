const router = require('express').Router();
const { authController } = require('../controllers/index');

router.post('/', authController.userAuth);
router.post('/create', authController.createUser);

module.exports = router;
