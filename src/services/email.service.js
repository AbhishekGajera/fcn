const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');
// SMTP_SERVICE=gmail
// SMTP_HOST=smtp.gmail.com
// SMTP_PORT=587
// SMTP_USERNAME=fcndashboard@gmail.com
// SMTP_PASSWORD=Smart@111
// EMAIL_FROM=fcndashboard@gmail.com

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text,attachments) => {
  const msg = { from: config.email.from, to, subject, text,attachments };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://${process.env.FRONT_END_URL}/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};


/**
 * Send new password email
 * @param {string} to
 * @param {string} email
 * @param {string} password
 * @returns {Promise}
 */
 const sendNewPasswordEmail = async (to, email, password) => {
  const subject = 'Your username-password';
  const text = `Dear user,
  Your email address or ( and ) password has been updated on your profile successfully.
  Your credentials for login from now is as shown below
  Email : ${email},
  Password : ${password}`;
  await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};
// const pdf = await generatePDF(`
      
//     `);

const sendEmailWelcome = async (to) => {
  const subject = 'Welcome To FCN';
  // replace this url with the link to the email verification page of your front-end app
  const text = 'Check out this attached pdf file';
 const  attachments= [{
    filename: 'welcome_letter.pdf', 
    path: '../utils/extra/welcome_letter.pdf',
    contentType: 'application/pdf'
  }];
  await sendEmail(to, subject, text,attachments);
};
0


module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendNewPasswordEmail,
  sendEmailWelcome
};
