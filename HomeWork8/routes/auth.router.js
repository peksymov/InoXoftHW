const router = require('express').Router();
const { validationCases } = require('../services/validation.service');
const { tokenMiddleware, authMiddleware } = require('../middlewares');

const { authControllers } = require('../controllers/index');

router.post('/', validationCases('login'), authMiddleware.isUserExist, authControllers.userAuth);
router.post('/create', validationCases('creation'), authMiddleware.isEmailAlreadyExist, authControllers.createUser);
router.post('/logout', tokenMiddleware.checkAccessTokenMiddleware, authControllers.userLogout);
router.post('/refresh', tokenMiddleware.checkRefreshToken, authControllers.refreshToken);
router.post('/forgotPassword/', authControllers.forgotPassword);
router.post('/generate_action_token', authControllers.generateActionToken);

module.exports = router;
