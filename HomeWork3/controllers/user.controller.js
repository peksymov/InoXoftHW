const fs = require('fs');
const path = require('path');
const util = require('util');

const readPromise = util.promisify(fs.readFile);
const userPath = path.join('database', 'ussers.json');
const writeFilePromise = util.promisify(fs.writeFile);

const getAllUsersFromJSON = async () => {
    const users = await readPromise(userPath);
    return JSON.parse(users);
};

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await getAllUsersFromJSON();
        res.render('users', { users });
    },
    getUserByID: async (req, res) => {
        const { user_id } = req.params;
        const users = await getAllUsersFromJSON();
        const user = users.find((userFrom) => userFrom.email === user_id);
        res.render('user', { user, users });
    },

    createUser: async (req, res) => {
        const { body } = req;
        const users = await getAllUsersFromJSON();
        const user = users.find((userFrom) => userFrom.email !== body.email);
        if (body.email === user.email) {
            res.render('login');
            return;
        }
        users.push(body);
        await writeFilePromise(userPath, JSON.stringify(users));
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
    deleteUser: async (req, res) => {
        const { user_id } = req.params;
        const users = await getAllUsersFromJSON();
        const user = users.find((userFrom) => userFrom.email === user_id);
        const newUsers = users.filter((item) => item.email !== user.email);
        await writeFilePromise(userPath, JSON.stringify(newUsers));
        res.redirect('/users');
    }
};
