const router = require('express').Router();
const {
    isEmailAlreadyExist,
    isUserExist,
    validationCases
} = require('../middlewares/user.middlewares');
const { authControllers } = require('../controllers/index');

router.post('/', validationCases('login'), isUserExist, authControllers.userAuth);
router.post('/create', validationCases('creation'), isEmailAlreadyExist, authControllers.createUser);

module.exports = router;

// validatingUserCreation,
// validatingUserLogin
// router.post('/', validatingUserLogin, isUserExist, authControllers.userAuth);
// router.post('/create', validatingUserCreation, isEmailAlreadyExist, authControllers.createUser);
