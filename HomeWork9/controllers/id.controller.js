const ErrorHandler = require('../errors/ErrorHandler');
const { User } = require('../database');

module.exports = {
    getUserById: async (req, res, next) => {
        try {
            const { query } = req;
            const user = await User.findById(query);
            if (!user) {
                throw new ErrorHandler(433, 'не нашел юзера по ID');
            }
            await res.json(user);
        } catch (e) {
            next(e);
        }
    },
};
