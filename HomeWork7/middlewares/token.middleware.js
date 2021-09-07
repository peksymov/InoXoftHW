const ErrorHandler = require('../errors/ErrorHandler');
const { AUTHORIZATION } = require('../configs/constants');
const { OAuth } = require('../database');
const jwtService = require('../services/jwt.service');
const { USER } = require('../configs/dataBase.enum');

module.exports = {
    checkAccessTokenMiddleware: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(404, 'нет токена');
            }

            await jwtService.verifyToken(token);

            const tokenFromDB = await OAuth.findOne({ access_token: token }).populate(USER);
            if (!tokenFromDB) {
                throw new ErrorHandler(404, 'такого токена нет в БАЗE');
            }
            req.currentUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(404, 'нет токена');
            }

            await jwtService.verifyToken(token, 'refresh');

            const tokenFromDB = await OAuth.findOne({ refresh_token: token }).populate(USER);
            if (!tokenFromDB) {
                throw new ErrorHandler(404, 'такого токена нет в БАЗE');
            }
            req.currentUser = tokenFromDB.user;
            next();
        } catch (e) {
            next(e);
        }
    }
};
