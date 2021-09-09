const {
    WELCOME,
    GOODBYE,
    CREATE_USER,
    SUCCESS_CHANGE_PASSWORD,
    TOKEN_QUERY
} = require('../configs/emailService.enum');

module.exports = {
    [WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome on Board'
    },
    [GOODBYE]: {
        templateName: 'goodbye',
        subject: 'Good bye my dear friend'
    },
    [CREATE_USER]: {
        templateName: 'create_user',
        subject: 'Congrats my dear friend! you have been registered'
    },
    [SUCCESS_CHANGE_PASSWORD]: {
        templateName: 'success_change_pass',
        subject: 'YOU CHANGED YOUR PASSWORD! Молодчинка'
    },
    [TOKEN_QUERY]: {
        templateName: 'token_query',
        subject: 'here your token to change password'
    }
};
