const ErrorHandler = require('../errors/ErrorHandler');
const { requestHandlerEnum } = require('../configs');
const { User } = require('../database');

module.exports = {
    isUserEmailCorrect: async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                throw new ErrorHandler(requestHandlerEnum.NOT_FOUND, 'не нашел юзера в isUserEmailCorrect');
            }
            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },
    isUserByIdPresent: async (req, res, next) => {
        try {
            const userFromBody = req.body;
            const user = await User.findById(userFromBody.user_id);
            if (!user) {
                throw new ErrorHandler(requestHandlerEnum.NOT_FOUND, 'не нашел юзера в isUserByIdPresent');
            }
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }
};
