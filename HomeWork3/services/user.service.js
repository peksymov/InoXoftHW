const fs = require('fs');
const path = require('path');
const util = require('util');

const readPromise = util.promisify(fs.readFile);
const userPath = path.join('database', 'ussers.json');
const writeFilePromise = util.promisify(fs.writeFile);

const rewriteJSONFile = async (someUsers) => {
    const users = await writeFilePromise(userPath, JSON.stringify(someUsers));
    return users;
};

const getAllUsersFromJSON = async () => {
    const users = await readPromise(userPath);
    return JSON.parse(users);
};

module.exports = {
    getAllUsersFromJSON,
    rewriteJSONFile
};
