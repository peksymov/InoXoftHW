const { Schema, model } = require('mongoose');
const { USER, FORGOT_PASS } = require('../configs/dataBase.enum');

const ForgotPassSchema = new Schema({
    action_token: {
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

module.exports = model(FORGOT_PASS, ForgotPassSchema);
