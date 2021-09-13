const ErrorHandler = require('../errors/ErrorHandler');
const { requestHandlerEnum } = require('../configs');
const userValidators = require('../validators/user.validator');

module.exports = {
    // eslint-disable-next-line complexity
    validationCases: (validCase) => (req, res, next) => {
        try {
            if (validCase === 'creation') {
                const { error, value } = userValidators.createUserValidator.validate(req.body);
                if (error) {
                    throw new ErrorHandler(requestHandlerEnum.BAD_REQUEST, error.details[0].message);
                }
                req.body = value;
                next();
            } else if (validCase === 'updating') {
                const { error, value } = userValidators.updateUserValidator.validate(req.body);
                if (error) {
                    throw new ErrorHandler(requestHandlerEnum.BAD_REQUEST, error.details[0].message);
                }
                const user_id = userValidators.idValidation.validate(req.params);
                const newValue1 = user_id.value.user_id;
                const newValue = { ...value, user_id: newValue1 };
                req.body = newValue;
                next();
            } else if (validCase === 'login') {
                const { error, value } = userValidators.loginUserValidator.validate(req.body);
                if (error) {
                    throw new ErrorHandler(requestHandlerEnum.BAD_REQUEST, error.details[0].message);
                }
                req.body = value;
                next();
            } else if (validCase === 'loginAdmin') {
                const { error, value } = userValidators.loginAdminValidator.validate(req.body);
                if (error) {
                    throw new ErrorHandler(requestHandlerEnum.BAD_REQUEST, error.details[0].message);
                }
                req.body = value;
                next();
            } else if (validCase === 'id') {
                const { error, value } = userValidators.idValidation.validate(req.params);
                if (error) {
                    throw new ErrorHandler(requestHandlerEnum.BAD_REQUEST, error.details[0].message);
                }
                req.body = value;
                next();
            } else if (validCase === 'email') {
                const { error, value } = userValidators.emailValidation.validate(req.params);
                if (error) {
                    throw new ErrorHandler(requestHandlerEnum.BAD_REQUEST, error.details[0].message);
                }
                req.body = value;
                next();
            }
        } catch (e) {
            next(e);
        }
    },
};
