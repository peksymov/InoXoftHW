const { getAllUsersFromJSON, rewriteJSONFile } = require('../services/user.service');

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await getAllUsersFromJSON();
        res.render('users', { users });
    },
    getUserByEmail: async (req, res) => {
        const { user_id } = req.params;
        const users = await getAllUsersFromJSON();
        const user = users.find((userFrom) => userFrom.email === user_id);
        res.render('user', { user, users });
    },
    deleteUser: async (req, res) => {
        const { user_id } = req.params;
        const users = await getAllUsersFromJSON();
        const user = users.find((userFrom) => userFrom.email === user_id);
        const newUsers = users.filter((item) => item.email !== user.email);
        await rewriteJSONFile(newUsers);
        res.redirect('/users');
    }
};
