const { CREATED, SUCCESS } = require('../configs/request_handler.enum');
const { User, OAuth } = require('../database');
const jwtService = require('../services/jwt.service');
const passwordService = require('../services/password.services');
const userUtil = require('../utils/user.util');

const { AUTHORIZATION } = require('../configs/constants');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;
            const hashPassword = await passwordService.hash(password);
            const user = await User.create({ ...req.body, password: hashPassword });
            const normalizedUser = userUtil.userNormalizator(user);
            await res.status(CREATED).json({ message: 'Successful creation', data: normalizedUser });

            // console.log("createUser",req.body)
            // const user = await User.create(req.body);
            // await res.status(CREATED).json(user);
        } catch (e) {
            next(e);
        }
    },
    userAuth: async (req, res, next) => {
        try {
            const { user } = req;
            await res.status(SUCCESS).json(user);
        } catch (e) {
            next(e);
        }
    },
    userLogout: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);
            await OAuth.deleteOne({ access_token: token });
            await res.json('РАЗЛОГИНИЛСЯ');
        } catch (e) {
            next(e);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);
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
    }
};
