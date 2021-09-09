const express = require('express');

require('dotenv').config(process.cwd());

const app = express();
const mongoose = require('mongoose');

const { PORT } = require('./configs/config');

mongoose.connect('mongodb://localhost:27017/inoxoft');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(_mainErrorHandler);

const {
    userRouter, authRouter, idRouter, filmRouter
} = require('./routes');

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/id', idRouter);
app.use('/films', filmRouter);

app.listen(PORT, () => {
    console.log('PORT PORT PORT');
});

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message || 'Unknown error'
        });
}
