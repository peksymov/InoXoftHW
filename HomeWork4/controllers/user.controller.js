const ErrorHandler = require('../errors/ErrorHandler');
const { CREATED, SUCCESS, DELETED } = require('../configs/request_handler.enum');
const { User } = require('../database');

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
            await res.json({ status: SUCCESS, message: 'нашелся' });
            // await res.json(user);
        } catch (e) {
            next(e);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const { user } = req;
            await User.findByIdAndDelete(user);
            // await res.json({ status: DELETED, message: 'нашли и удалили' });
            await res.status(DELETED).json({ message: 'нашли и удалили' });
        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const { user } = req;
            const updatedField = req.body;
            const updatedUser = await User.findByIdAndUpdate(user, { ...updatedField }, {});
            if (updatedUser) {
                await res.json({ status: CREATED, message: 'знашли и змінили' });
            } else {
                throw new ErrorHandler(431, 'не нашли и не изменилі update');
            }
        } catch (e) {
            next(e);
        }
    }
};
