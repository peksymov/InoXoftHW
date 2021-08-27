const router = require('express').Router();
const { userController } = require('../controllers/index');

router.get('/', userController.getAllUsers);
router.get('/:user_id', userController.getUserByEmail);
router.delete('/:user_id', userController.deleteUser);

module.exports = router;
