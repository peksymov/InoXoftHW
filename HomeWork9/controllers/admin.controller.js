const { constants, userRoleEnum, dataBaseEnum } = require('../configs');
const { passwordService, jwtService } = require('../services');
const { User, OAuth, CreateAdmin, } = require('../database');
const userUtil = require('../utils/user.util');

module.exports = {
    loginAdmin: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const admin = await User.findOne({ email, role: userRoleEnum.ADMIN }).select('+password');
            await passwordService.compare(password, admin.password);
            const tokenPair = await jwtService.generateTokenPairForAdmin();
            const user = await OAuth.create({ ...tokenPair, user: admin._id });
            const normalizedUserWithToken = {
                ...tokenPair, user: userUtil.userNormalizator(user)
            };
            await res.json(normalizedUserWithToken);
        } catch (e) {
            next(e);
        }
    },
    createAdminBySuperAdmin: async (req, res, next) => {
        try {
            const tokenSuperAdmin = req.get(constants.AUTHORIZATION);
            if (tokenSuperAdmin) {
                // eslint-disable-next-line no-unused-vars
                const { name, email, password } = req.body;
                const hashPassword = await passwordService.hash(password);
                const actionAdminToken = await jwtService.actionTokenGenerateByType(dataBaseEnum.CREATE_ADMIN);
                const newAdmin = await User.create({
                    ...req.body,
                    password: hashPassword,
                    role: userRoleEnum.ADMIN,
                    actionAdminToken
                });
                const normalizedAdmin = {
                    actionAdminToken, user: userUtil.userNormalizator(newAdmin)
                };
                await CreateAdmin.create({ action_admin_token: actionAdminToken, user: newAdmin._id });
                await res.json(normalizedAdmin);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    getAdmins: async (req, res, next) => {
        try {
            await req.get(constants.AUTHORIZATION);
            const allAdmins = await User.find({ role: userRoleEnum.ADMIN });
            await res.json(allAdmins);
        } catch (e) {
            next(e);
        }
    }
};
