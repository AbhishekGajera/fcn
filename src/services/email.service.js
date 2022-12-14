const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');
const path = require('path');
const handlebars = require('handlebars');
const fs = require('fs');
var hummus = require('hummus');

/**
 * Returns a byteArray string
 * 
 * @param {string} str - input string
 */
function strToByteArray(str) {
  var myBuffer = [];
  var buffer = new Buffer(str);
  for (var i = 0; i < buffer.length; i++) {
      myBuffer.push(buffer[i]);
  }
  return myBuffer;
}

let stringD = ''

function replaceText(sourceFile, targetFile, pageNumber, findText, replaceText) {  
  console.info("sourceFile++ ",sourceFile,targetFile)
    var writer = hummus.createWriterToModify(sourceFile, {
        modifiedFilePath: targetFile
    });
    console.info("writer++ ",writer)
    var sourceParser = writer.createPDFCopyingContextForModifiedFile().getSourceDocumentParser();
    var pageObject = sourceParser.parsePage(pageNumber);
    var textObjectId = pageObject.getDictionary().toJSObject().Contents.getObjectID();
    var textStream = sourceParser.queryDictionaryObject(pageObject.getDictionary(), 'Contents');
    //read the original block of text data
    var data = [];
    var readStream = sourceParser.startReadingFromStream(textStream);
    while(readStream.notEnded()){
        Array.prototype.push.apply(data, readStream.read(10000));
    }
    var string = new Buffer(data).toString().replace(findText, replaceText);
    console.info(string)
    stringD = string

    //Create and write our new text object
    var objectsContext = writer.getObjectsContext();
    objectsContext.startModifiedIndirectObject(textObjectId);

    var stream = objectsContext.startUnfilteredPDFStream();
    stream.getWriteStream().write(strToByteArray(string));
    objectsContext.endPDFStream(stream);

    objectsContext.endIndirectObject();

    writer.end();
    setTimeout(() => {
      console.info("string++ ",string)
    }, 10000);

}

// import generatePDF from "../utils/lib/generatePDFs";
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
// const sendEmail = async (to, subject, text,attachments) => {
//   const msg = { from: config.email.from, to, subject, text,attachments };
//   await transport.sendMail(msg);
// };
const sendEmail = async (to, subject, text, html) => {
  const msg = { from: config.email.from, to, subject, text, html };
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


const sendEmailWelcome = async (to,name) => {
  let filePath = path.join(__dirname, '../utils/extra/welcome_letter.hbs')
const text = 'FCN';
  const subject = 'Welcome To FCN';

const source = fs.readFileSync(filePath, 'utf-8').toString();
const template = handlebars.compile(source);
const replacements = {
  name
};
const htmlToSend = template(replacements, {
  allowedProtoMethods: {
    trim: true
  },
  allowProtoMethodsByDefault: true,
  allowProtoPropertiesByDefault: true
});
const html = htmlToSend;
 
  try {
    await sendEmail(to, subject, text,html);
  } catch (error) {
    console.info(error)
  }
};
const sendEmailCp = async (to,name) => {
  let filePath = path.join(__dirname, '../utils/extra/cp_welcome_letter.hbs')
const text = 'FCN';
  const subject = 'Welcome To FCN';

const source = fs.readFileSync(filePath, 'utf-8').toString();
const template = handlebars.compile(source);
const replacements = {
  name
};
const htmlToSend = template(replacements, {
  allowedProtoMethods: {
    trim: true
  },
  allowProtoMethodsByDefault: true,
  allowProtoPropertiesByDefault: true
});
const html = htmlToSend;
 
  try {
    await sendEmail(to, subject, text,html);
  } catch (error) {
    console.info(error)
  }
};
const sendEmailPo = async (to,name) => {
  let filePath = path.join(__dirname, '../utils/extra/powerone_welcome_letter.hbs')
const text = 'FCN';
  const subject = 'Welcome To FCN';

const source = fs.readFileSync(filePath, 'utf-8').toString();
const template = handlebars.compile(source);
const replacements = {
  name
};
const htmlToSend = template(replacements, {
  allowedProtoMethods: {
    trim: true
  },
  allowProtoMethodsByDefault: true,
  allowProtoPropertiesByDefault: true
});
const html = htmlToSend;
 
  try {
    await sendEmail(to, subject, text,html);
  } catch (error) {
    console.info(error)
  }
};
const sendEmailEq = async (to,name) => {
  let filePath = path.join(__dirname, '../utils/extra/equity_welcome_letter.hbs')
const text = 'FCN';
  const subject = 'Welcome To FCN';

const source = fs.readFileSync(filePath, 'utf-8').toString();
const template = handlebars.compile(source);
const replacements = {
  name
};
const htmlToSend = template(replacements, {
  allowedProtoMethods: {
    trim: true
  },
  allowProtoMethodsByDefault: true,
  allowProtoPropertiesByDefault: true
});
const html = htmlToSend;
 
  try {
    await sendEmail(to, subject, text,html);
  } catch (error) {
    console.info(error)
  }
};
const sendEmailFx = async (to,name) => {
  let filePath = path.join(__dirname, '../utils/extra/fx_account_welcome_letter.hbs')
const text = 'FCN';
  const subject = 'Welcome To FCN';

const source = fs.readFileSync(filePath, 'utf-8').toString();
const template = handlebars.compile(source);
const replacements = {
  name
};
const htmlToSend = template(replacements, {
  allowedProtoMethods: {
    trim: true
  },
  allowProtoMethodsByDefault: true,
  allowProtoPropertiesByDefault: true
});
const html = htmlToSend;
 
  try {
    await sendEmail(to, subject, text,html);
  } catch (error) {
    console.info(error)
  }
};
const sendEmailSip = async (to,name) => {
  let filePath = path.join(__dirname, '../utils/extra/sip_welcome_letter.hbs')
const text = 'FCN';
  const subject = 'Welcome To FCN';

const source = fs.readFileSync(filePath, 'utf-8').toString();
const template = handlebars.compile(source);
const replacements = {
  name
};
const htmlToSend = template(replacements, {
  allowedProtoMethods: {
    trim: true
  },
  allowProtoMethodsByDefault: true,
  allowProtoPropertiesByDefault: true
});
const html = htmlToSend;
 
  try {
    await sendEmail(to, subject, text,html);
  } catch (error) {
    console.info(error)
  }
};

// const sendEmailWelcomeIbo = async (to,name) => {
//   const subject = 'Welcome To FCN';
//   try {
//     replaceText(path.join(__dirname, '../utils/extra/welcome_letter.pdf'), path.join(__dirname, '../utils/extra/output.pdf'), 0, '[(T)122(o,)]', `[(${name})]`);
//   } catch (error) {
    
//   }
 
//   const attachments = [
//     {
//         filename: 'welcome_letter.pdf',  
//         path: path.join(__dirname, '../utils/extra/output.pdf')  ,                               
//         contentType: 'application/pdf',
//     }]
  
// //   const pdf = await generatePDF(`
// // <html> 
// // <head>
// //   <title>Test PDF</title>
// // </head>
// // <body>
// // <h1>gg</h1>
// //    // The contents of our PDF will go here...
// // </body>
// // </html>
// //     `);
//   // replace this url with the link to the email verification page of your front-end app
//   const text = 'Check out this attached pdf file';
 
//   try {
//     await sendEmail(to, subject, text,attachments);
//   } catch (error) {
//     console.info(error)
//   }
// };



module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendNewPasswordEmail,
  sendEmailWelcome,
  sendEmailCp,
  sendEmailPo,
  sendEmailFx,
  sendEmailEq,
  sendEmailSip
  
  // sendEmailWelcomeIbo
};
