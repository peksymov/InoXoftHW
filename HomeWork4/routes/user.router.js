const router = require('express').Router();
const { userControllers } = require('../controllers/index');
const {
    isUserEmailCorrect,
    isUserByIdPresent,
    validationCases
} = require('../middlewares/user.middlewares');

router.get('/', userControllers.getAllUsers);
router.get('/:email', isUserEmailCorrect, userControllers.getUserByEmail);
router.put('/:user_id', validationCases('updating'), isUserByIdPresent, userControllers.updateUser);
router.delete('/:user_id', isUserByIdPresent, userControllers.deleteUser);

module.exports = router;

// validatingUserUpdating,
// router.put('/:user_id', validatingUserUpdating, isUserByIdPresent, userControllers.updateUser);  // +
