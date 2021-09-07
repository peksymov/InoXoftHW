const router = require('express').Router();
const { checkAccessTokenMiddleware, checkRefreshToken } = require('../middlewares/token.middleware');

const {
    isEmailAlreadyExist,
    isUserExist,
    validationCases
} = require('../middlewares/user.middlewares');
const { authControllers } = require('../controllers/index');

router.post('/', validationCases('login'), isUserExist, authControllers.userAuth);
router.post('/create', validationCases('creation'), isEmailAlreadyExist, authControllers.createUser);
router.post('/logout', checkAccessTokenMiddleware, authControllers.userLogout);
router.post('/refresh', checkRefreshToken, authControllers.refreshToken);

module.exports = router;
