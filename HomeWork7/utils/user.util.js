const userNormalizator = (userToNormalize) => {
    const fieldsToRemove = [
        'password',
        '__v'
    ];

    userToNormalize = userToNormalize.toJSON();
    // userToNormalize = userToNormalize.toObject()

    fieldsToRemove.forEach((field) => {
        delete userToNormalize[field];
    });
    return userToNormalize;
};

module.exports = {
    userNormalizator
};
