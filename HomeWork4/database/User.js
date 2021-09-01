const { Schema, model } = require('mongoose');
const userRoleEnum = require('../configs/user.role.enum');

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
    }
}, { timestamps: true });

module.exports = model('user', userSchema);
