const router = require('express').Router();
const { checkAccessTokenMiddleware } = require('../middlewares/token.middleware');
const { userControllers } = require('../controllers/index');
const {
    isUserEmailCorrect,
    isUserByIdPresent,
    validationCases,
} = require('../middlewares/user.middlewares');

router.get('/', userControllers.getAllUsers);
router.get('/:email', validationCases('email'), isUserEmailCorrect, userControllers.getUserByEmail);
router.put('/:user_id', validationCases('updating'), isUserByIdPresent, checkAccessTokenMiddleware, userControllers.updateUser);
router.delete('/:user_id', validationCases('id'), isUserByIdPresent, checkAccessTokenMiddleware, userControllers.deleteUser);

module.exports = router;
