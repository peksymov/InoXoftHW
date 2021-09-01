const { CREATED } = require('../../HomeWork5/configs/request_handler.enum');
const { User } = require('../database');
const userUtil = require('../utils/user.util');

const passwordService = require('../services/password.services');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;
            const hashPassword = await passwordService.hash(password);
            const user = await User.create({ ...req.body, password: hashPassword });
            const normalizedUser = userUtil.userNormalizator(user);
            await res.status(CREATED).json(normalizedUser);

            // console.log("createUser",req.body)
            // const user = await User.create(req.body);
            // await res.status(CREATED).json(user);
        } catch (e) {
            next(e);
        }
    },
    userAuth: async (req, res, next) => {
        try {
            await res.json('Success Login');
        } catch (e) {
            next(e);
        }
    }
};
