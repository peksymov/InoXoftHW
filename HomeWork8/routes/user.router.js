const router = require('express').Router();
const { validationCases } = require('../services/validation.service');
const { userControllers } = require('../controllers/index');
const { tokenMiddleware, userMiddleware } = require('../middlewares');

router.get('/', userControllers.getAllUsers);

router.get('/:email',
    validationCases('email'),
    userMiddleware.isUserEmailCorrect,
    userControllers.getUserByEmail);

router.put('/:user_id',
    validationCases('updating'),
    userMiddleware.isUserByIdPresent,
    tokenMiddleware.checkAccessTokenMiddleware,
    userControllers.updateUser);

router.delete('/:user_id',
    validationCases('id'),
    userMiddleware.isUserByIdPresent,
    tokenMiddleware.checkAccessTokenMiddleware,
    userControllers.deleteUser);

module.exports = router;
