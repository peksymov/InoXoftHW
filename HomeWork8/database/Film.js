const { Schema, model } = require('mongoose');
const { USER } = require('../configs/dataBase.enum');

const filmsSchema = new Schema({
    filmName: {
        type: String,
        required: true
    },
    filmType: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: false
    },
    userCreator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, { timestamps: true });

module.exports = model('film', filmsSchema);
