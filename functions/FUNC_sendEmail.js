const nodemailer = require('nodemailer');

module.exports.run = async (serviceName, status, email, config) => {
  const testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: config.smtpHostAdress,
    port: config.smtpPort,
    secure: config.smtpSSLRequired,
    auth: {
      user: config.smtpUsername,
      pass: config.smtpPassword,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `'Fred Foo 👻' <${config.username}>`,
    to: email,
    subject: `${serviceName} is ${status}`,
    text: `The Service ${serviceName} went into a ${status} state!`,
    html: `<b>The Service ${serviceName} went into a ${status} state!</b>`,
  });

  console.log(`Message sent: ${info.messageId}`);
};

module.exports.help = {
  name: 'FUNC_sendEmail',
};
