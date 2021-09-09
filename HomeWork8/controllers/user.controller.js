const ErrorHandler = require('../errors/ErrorHandler');
const { requestHandlerEnum, emailServiceEnum } = require('../configs');
// const { CREATED, SUCCESS } = require('../configs/request_handler.enum');
// const { WELCOME } = require('../configs/emailService.enum');
const { User } = require('../database');
const emailService = require('../services/email.service');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find({ });
            await res.json(users);
        } catch (e) {
            next(e);
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const { user } = req;
            if (!user) {
                throw new ErrorHandler(433, 'не нашел юзера getUserById');
            }
            await res.json(user);
        } catch (e) {
            next(e);
        }
        // const { user } = req;
    },
    getUserByEmail: async (req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                throw new ErrorHandler(433, 'не нашел юзера controller --- getUserByEmail');
            }
            await emailService.sendMail('peksymov@gmail.com', emailServiceEnum.WELCOME, { userName: user.name });
            await res.json({ status: requestHandlerEnum.SUCCESS, message: 'нашелся' });
            // await res.json(user);
        } catch (e) {
            next(e);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const { user } = req;
            const { currentUser } = req;
            const idFromToken = (currentUser._id).toString();
            const updatedIdString = user._id.toString();
            if (idFromToken === updatedIdString) {
                await User.findByIdAndDelete(user);
                await res.json({ message: 'нашли и удалили' });
            } else {
                throw new ErrorHandler(431, 'токени не совпали при удалении');
            }
        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const { user } = req;
            const { currentUser } = req;
            const updatedField = req.body;
            const idFromToken = (currentUser._id).toString();
            if (idFromToken === updatedField.user_id) {
                const updatedUser = await User.findByIdAndUpdate(user, { ...updatedField }, {});
                if (updatedUser) {
                    // await emailService.sendMail('s.peksymov@gmail.com')
                    await res.json({ status: requestHandlerEnum.CREATED, message: 'знашли и змінили' });
                } else {
                    throw new ErrorHandler(431, 'не нашли и не изменилі update');
                }
            } else {
                throw new ErrorHandler(431, 'Юзері не совпали. Не может другой юзер сам себя апдейтить');
            }
        } catch (e) {
            next(e);
        }
    }
};
