const Joi = require('joi');
const {
    CURRENT_YEAR,
    PASSWORD_REGEXP,
    EMAIL_REGEXP,
    NAME_REGEXP
} = require('../configs/constants');
const userRolesEnum = require('../configs/user.role.enum');

const girlsSchema = Joi.object({
    name: Joi.string(),
    age: Joi.number().min(15).max(60)
});
const loginUserValidator = Joi.object({
    email: Joi.string().email(EMAIL_REGEXP).trim().lowercase()
        .required(),
    password: Joi.string().regex(PASSWORD_REGEXP).trim().required(),
});
const loginAdminValidator = Joi.object({
    email: Joi.string().email(EMAIL_REGEXP).trim().lowercase()
        .required(),
    password: Joi.string().regex(PASSWORD_REGEXP).trim().required(),
    role: 'admin'
});
const createUserValidator = Joi.object({
    name: Joi.string().pattern(NAME_REGEXP).min(2).max(20)
        .trim()
        .required(),
    password: Joi.string().regex(PASSWORD_REGEXP).trim().required(),
    born_year: Joi.number().integer().min(CURRENT_YEAR - 120).max(CURRENT_YEAR - 6),
    email: Joi.string().email(EMAIL_REGEXP).trim().lowercase()
        .required(),
    role: Joi.string().allow(...Object.values(userRolesEnum)),

    car: Joi.boolean(),

    girls: Joi.array()
        .items(girlsSchema)
        .when(
            'car', { is: true, then: Joi.required() }
        )
});
const updateUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(20)
        .trim(),
    // password doesn`t change here
    born_year: Joi.number().integer().min(CURRENT_YEAR - 120).max(CURRENT_YEAR - 6),
    email: Joi.string().email(EMAIL_REGEXP).trim().lowercase(),
    role: Joi.string().allow(...Object.values(userRolesEnum)),

    car: Joi.boolean(),

    girls: Joi.array()
        .items(girlsSchema)
        .when(
            'car', { is: true, then: Joi.required() }
        )
});
const idValidation = Joi.object({
    user_id: Joi.string().min(24).max(24)
});
const emailValidation = Joi.object({
    email: Joi.string().email(EMAIL_REGEXP).trim().lowercase()
        .required()
});

module.exports = {
    createUserValidator,
    updateUserValidator,
    loginUserValidator,
    idValidation,
    emailValidation,
    loginAdminValidator
};
