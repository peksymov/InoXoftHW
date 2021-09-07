const ErrorHandler = require('../errors/ErrorHandler');
const { UN_AUTHORIZED, BAD_REQUEST, NOT_FOUND } = require('../configs/request_handler.enum');
const { User } = require('../database');
const userValidators = require('../validators/user.validator');
const passwordService = require('../services/password.services');
const jwtService = require('../services/jwt.service');
const userUtil = require('../utils/user.util');
const { OAuth } = require('../database');

module.exports = {
    // eslint-disable-next-line complexity
    validationCases: (validCase) => (req, res, next) => {
        try {
            if (validCase === 'creation') {
                const { error, value } = userValidators.createUserValidator.validate(req.body);
                if (error) {
                    throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
                }
                req.body = value;
                next();
            } else if (validCase === 'updating') {
                const { error, value } = userValidators.updateUserValidator.validate(req.body);
                if (error) {
                    throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
                }
                const user_id = userValidators.idValidation.validate(req.params);
                const newValue1 = user_id.value.user_id;
                const newValue = { ...value, user_id: newValue1 };
                req.body = newValue;
                next();
            } else if (validCase === 'login') {
                const { error, value } = userValidators.loginUserValidator.validate(req.body);
                if (error) {
                    throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
                }
                req.body = value;
                next();
            } else if (validCase === 'id') {
                const { error, value } = userValidators.idValidation.validate(req.params);
                if (error) {
                    throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
                }
                req.body = value;
                next();
            } else if (validCase === 'email') {
                const { error, value } = userValidators.emailValidation.validate(req.params);
                if (error) {
                    throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
                }
                req.body = value;
                next();
            }
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
                throw new ErrorHandler(BAD_REQUEST, 'Email already exist. Try to login');
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    isUserExist: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const hashPassword = await passwordService.hash(password);
            await passwordService.compare(password, hashPassword);
            const user = await User.findOne({ email, hashPassword });

            const tokenPair = jwtService.generateTokenPair();
            await OAuth.create({ ...tokenPair, user: user._id });

            const user2 = {
                ...tokenPair, user: userUtil.userNormalizator(user)
            };
            if (!user) {
                // await res.status(404).json('нет такого юзера');
                throw new ErrorHandler(UN_AUTHORIZED, 'Email or Password not correct');
            }
            req.user = user2;

            next();
        } catch (e) {
            next(e);
        }
    },
    isUserEmailCorrect: async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                throw new ErrorHandler(NOT_FOUND, 'не нашел юзера в isUserEmailCorrect');
            }
            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },
    isUserByIdPresent: async (req, res, next) => {
        try {
            const something = req.body;
            const user = await User.findById(something.user_id);
            if (!user) {
                throw new ErrorHandler(NOT_FOUND, 'не нашел юзера в isUserByIdPresent');
            }
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }
};

// const validationCases = (validCase) => (req,res,next) => {
//     try {
//         if(validCase === 'login') {
//             const { error, value } = userValidators.createUserValidator.validate(req.body)
//             if (error) {
//                 throw new ErrorHandler(400, error.details[0].message)
//             }
//             console.log("creationValue --- creationValue ---",value)
//             req.body = value
//             next()
//         }
//         else if (validCase === 'creation') {
//             const { error, value } = userValidators.updateUserValidator.validate(req.body)
//             if (error) {
//                 throw new ErrorHandler(400, error.details[0].message)
//             }
//             console.log("creationValue --- creationValue ---",value)
//             req.body = value
//             next()
//         }
//         else if (validCase === 'updating') {
//             const { error, value } = userValidators.loginUserValidator.validate(req.body)
//             if (error) {
//                 throw new ErrorHandler(400, error.details[0].message)
//             }
//             console.log("creationValue --- creationValue ---",value)
//             req.body = value
//             next()
//         }
//     } catch (e) {
//         next(e)
//     }
// }

// validatingUserCreation: (req,res,next) => {
//     try {
//         const { error, value } = userValidators.createUserValidator.validate(req.body)
//         if (error) {
//             throw new ErrorHandler(400, error.details[0].message)
//         }
//         console.log("creationValue --- creationValue ---",value)
//         req.body = value
//         next()
//     } catch (e) {
//         next(e)
//     }
// },
// validatingUserUpdating: (req, res, next) => {
//     try {
//         const { error, value } = userValidators.updateUserValidator.validate(req.body)
//         if (error) {
//             throw new ErrorHandler(400, error.details[0].message)
//         }
//         console.log("updatingValue --- updatingValue --- ",value)
//         req.body = value
//
//         next()
//     } catch (e) {
//         next(e)
//     }
// },
// validatingUserLogin: (req,res,next) => {
//     try {
//         const { error, value } = userValidators.loginUserValidator.validate(req.body)
//         if (error) {
//             throw new ErrorHandler(400, error.details[0].message)
//         }
//         console.log("loginValue --- loginValue --- ",value)
//         req.body = value
//
//         next()
//     } catch (e) {
//         next(e)
//     }
// },
