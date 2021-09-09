const jwt = require('jsonwebtoken');
const ErrorHandler = require('../errors/ErrorHandler');
const { UN_AUTHORIZED } = require('../configs/request_handler.enum');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, FORGOT_PASSWORD_TOKEN } = require('../configs/config');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
        const refresh_token = jwt.sign({}, REFRESH_TOKEN_SECRET, { expiresIn: '31d' });
        return {
            access_token,
            refresh_token
        };
    },
    verifyToken: (token, tokenType = 'access') => {
        try {
            const secret = tokenType === 'access' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;

            jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(UN_AUTHORIZED, 'invalid token');
        }
    },
    actionTokenGenerate: () => {
        const action_token = jwt.sign({}, FORGOT_PASSWORD_TOKEN, { expiresIn: '10m' });
        return {
            action_token
        };
    }
};
