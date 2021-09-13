const { Schema, model } = require('mongoose');
const userRoleEnum = require('../configs/user.role.enum');
const { USER } = require('../configs/dataBase.enum');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false
        // trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    role: {
        type: String,
        default: userRoleEnum.USER,
        enum: Object.values(userRoleEnum)
    },
    films: []
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

module.exports = model(USER, userSchema);
