const ErrorHandler = require('../errors/ErrorHandler');
const {
    requestHandlerEnum,
    emailServiceEnum,
    constants,
    dataBaseEnum
} = require('../configs');
const { User, OAuth, ForgotPassSchema } = require('../database');
const { jwtService, passwordService, emailService } = require('../services');
const userUtil = require('../utils/user.util');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;
            const hashPassword = await passwordService.hash(password);
            const user = await User.create({ ...req.body, password: hashPassword });
            const normalizedUser = userUtil.userNormalizator(user);

            await emailService.sendMail('peksymov@gmail.com', emailServiceEnum.CREATE_USER, { userName: normalizedUser.name });
            await res.status(requestHandlerEnum.CREATED).json({ message: 'Successful creation', data: normalizedUser });
        } catch (e) {
            next(e);
        }
    },
    userAuth: async (req, res, next) => {
        try {
            const { user } = req;
            await res.status(requestHandlerEnum.SUCCESS).json(user);
        } catch (e) {
            next(e);
        }
    },
    userLogout: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);
            await OAuth.deleteOne({ access_token: token });
            await res.json('LOGOUT complete)');
        } catch (e) {
            next(e);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);
            await OAuth.deleteOne({ refresh_token: token });
            const tokenPair = jwtService.generateTokenPair();
            const { currentUser } = req;
            await OAuth.create({ ...tokenPair, user: currentUser._id });
            // const user2 = {
            //     ...tokenPair, user: userUtil.userNormalizator(currentUser)
            // };
            await res.json({ message: 'РЕФРЕШНУЛ ТОКЕН', data: tokenPair });
        } catch (e) {
            next(e);
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const { token } = req.query;
            const passwordFromBody = req.body; // добавил
            const zabuvakaUser = await ForgotPassSchema.findOne({ action_token: token });
            const userFromDB = await User.findById(zabuvakaUser.user);
            // const someNewPassword = 'A!emggtg556q'; //  убрал
            const password = await passwordService.hash(passwordFromBody.password);
            await User.findByIdAndUpdate(userFromDB._id, { password }, {});
            await emailService.sendMail('peksymov@gmail.com',
                emailServiceEnum.SUCCESS_CHANGE_PASSWORD, { userName: userFromDB.name });
            await res.json({ message: 'Пароль змінено. Спробуйте залогінитись з новим токеном' });
            next();
        } catch (e) {
            next(e);
        }
    },
    generateActionToken: async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            const actionToken = jwtService.actionTokenGenerateByType(dataBaseEnum.FORGOT_PASS);
            await OAuth.deleteMany({ user: user._id });
            const newAction = await ForgotPassSchema.create({ ...actionToken, user: user._id });
            if (!newAction) {
                throw new ErrorHandler(404, 'новий токен не сгенеровано');
            }
            await emailService.sendMail('peksymov@gmail.com',
                emailServiceEnum.TOKEN_QUERY,
                { token_url: actionToken.action_token, userName: user.name });
            await res.json(actionToken);
            next();
        } catch (e) {
            next(e);
        }
    }
};
