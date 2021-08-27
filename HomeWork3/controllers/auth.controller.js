const { getAllUsersFromJSON, rewriteJSONFile } = require('../services/user.service');

module.exports = {
    createUser: async (req, res) => {
        const { body } = req;
        const users = await getAllUsersFromJSON();
        const user = users.find((userFrom) => userFrom.email !== body.email);
        if (body.email === user.email) {
            res.render('login');
            return;
        }
        users.push(body);
        await rewriteJSONFile(users);
        res.redirect('/users');
    },
    userAuth: async (req, res) => {
        const { body } = req;
        const users = await getAllUsersFromJSON();
        const user = users.find((userFrom) => userFrom.email === body.email);
        if (!user) {
            res.status(404).render('registration');
            return; // ВАЖЛИВО ПИСАТИ RETURN
        } if (user && user.password !== body.password) {
            res.status(404).render('fail');
            return;
        }
        res.render('user', { user, users });
    },
};
