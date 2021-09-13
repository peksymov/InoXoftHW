const router = require('express').Router();
const { adminController } = require('../controllers');
const { validationCases } = require('../services/validation.service');

router.get('/admins', adminController.getAdmins);
router.post('/login_admin', validationCases('loginAdmin'), adminController.loginAdmin);
router.post('/create_admin', validationCases('creation'), adminController.createAdminBySuperAdmin);

module.exports = router;
