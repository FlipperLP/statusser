const nodemailer = require('nodemailer');

const config = require('../config/main.json');

module.exports.run = async (html, text, subject, emails) => {
  let pool = false;
  if (emails.length > 1) pool = true;
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    pool,
    host: config.smtpHostAdress,
    port: config.smtpPort,
    secure: config.smtpSSLRequired,
    auth: {
      user: config.smtpUsername,
      pass: config.smtpPassword,
    },
  });

  const from = `'Statusser' <${config.username}>`;
  for (const to of emails) {
    // send mail with defined transport object
    // eslint-disable-next-line no-await-in-loop
    const info = await transporter.sendMail({
      from, to, subject, text, html,
    });
    console.log(`[${module.exports.help.name}] Message sent: ${info.messageId} (${to})`);
  }
};

module.exports.help = {
  name: 'FUNC_sendEmail',
};
