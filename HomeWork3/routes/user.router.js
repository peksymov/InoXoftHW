const router = require('express').Router();
const userControllers = require('../controllers/user.controller');

router.get('/users', userControllers.getAllUsers);
router.get('/users/:user_id', userControllers.getUserByID);

router.post('/auth', userControllers.userAuth);
router.post('/create', userControllers.createUser);

router.delete('/users/:user_id', userControllers.deleteUser);

module.exports = router;
