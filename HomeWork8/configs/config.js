module.exports = {
    PORT: process.env.PORT || 5000,
    DB_CONNECT_URL: process.env.DB_CONNECT_URL || 'mongodb://localhost:27017/inoxoft',

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'hello',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'helloWorld',

    EMAIL_BROADCAST: process.env.EMAIL_BROADCAST || 'someEmail@gmail.com',
    EMAIL_BROADCAST_PASS: process.env.EMAIL_BROADCAST_PASS || 'some12345password',

    FRONTEND_URL: process.env.FRONTEND_URL || 'https://www.google.com/',

    FORGOT_PASSWORD_TOKEN: process.env.FORGOT_PASSWORD_TOKEN || 'action'
};
