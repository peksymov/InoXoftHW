const ErrorHandler = require('../errors/ErrorHandler');
const { constants, dataBaseEnum } = require('../configs');
const { OAuth } = require('../database');
const jwtService = require('../services/jwt.service');

module.exports = {
    checkAccessTokenMiddleware: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(404, 'Відсутній токен авторизаціі');
            }

            await jwtService.verifyToken(token);

            const tokenFromDB = await OAuth.findOne({ access_token: token }).populate(dataBaseEnum.USER);
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
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(404, 'нет токена');
            }

            await jwtService.verifyToken(token, 'refresh');

            const tokenFromDB = await OAuth.findOne({ refresh_token: token }).populate(dataBaseEnum.USER);
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
