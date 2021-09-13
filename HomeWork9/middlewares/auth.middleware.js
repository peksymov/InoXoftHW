const ErrorHandler = require('../errors/ErrorHandler');
const { requestHandlerEnum } = require('../configs');
const { User, OAuth, ForgotPassSchema } = require('../database');
const passwordService = require('../services/password.services');
const jwtService = require('../services/jwt.service');
const userUtil = require('../utils/user.util');
// const { OAuth, ForgotPassSchema } = require('../database');

module.exports = {
    isUserExist: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email }).select('+password');

            await passwordService.compare(password, user.password);

            await ForgotPassSchema.deleteMany({ user: user._id });
            await OAuth.deleteMany({ user: user._id });

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.create({ ...tokenPair, user: user._id });

            const normalizedUserWithToken = {
                ...tokenPair, user: userUtil.userNormalizator(user)
            };
            if (!user) {
                throw new ErrorHandler(requestHandlerEnum.UN_AUTHORIZED, 'Email or Password not correct');
            }
            req.user = normalizedUserWithToken;

            next();
        } catch (e) {
            next(e);
        }
    },
    isEmailAlreadyExist: async (req, res, next) => {
        try {
            // eslint-disable-next-line no-unused-vars
            const { email, name, password } = req.body;
            const user = await User.findOne({ email });
            if (user) {
                throw new ErrorHandler(requestHandlerEnum.BAD_REQUEST, 'Email already exist. Try to login');
            }
            next();
        } catch (e) {
            next(e);
        }
    },
};
