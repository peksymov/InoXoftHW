const nodemailer = require('nodemailer');
const EmailTemplate = require('email-templates');
const path = require('path');
const ErrorHandler = require('../errors/ErrorHandler');
const templateInfo = require('../email-templates');

const { EMAIL_BROADCAST, EMAIL_BROADCAST_PASS, FRONTEND_URL } = require('../configs/config');

const templateParser = new EmailTemplate({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_BROADCAST,
        pass: EMAIL_BROADCAST_PASS
    }
});
const sendMail = async (userMail, emailAction, context = {}) => {
    const templateToSend = templateInfo[emailAction];
    context = { ...context, frontendURL: FRONTEND_URL };
    if (!templateToSend) {
        throw new ErrorHandler(500, 'не має темплейту');
    }
    const { templateName, subject } = templateToSend;
    const html = await templateParser.render(templateName, context);

    return transporter.sendMail({
        from: 'noReply ',
        to: userMail,
        // subject: subject,
        // html: html
        subject,
        html
    });
};

module.exports = {
    sendMail
};
