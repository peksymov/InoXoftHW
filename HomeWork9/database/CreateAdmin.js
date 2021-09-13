const { Schema, model } = require('mongoose');
const { USER, CREATE_ADMIN } = require('../configs/dataBase.enum');

const CreateAdmin = new Schema({
    action_admin_token: {
        type: String,
        required: true
    },
    [USER]: {
        // user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, { timestamps: true });

module.exports = model(CREATE_ADMIN, CreateAdmin);
