const bcrypt = require('bcrypt');

const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashPassword) => {
        const isPasswordMatches = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatches) {
            throw new ErrorHandler(400, 'Email and password is wrong');
        }
    }
};
