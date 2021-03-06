/* eslint-disable no-param-reassign */
// init filesystem
const fs = require('fs');
// init config
const config = require('../config/main.json');

const envFile = './config/config.json';

module.exports.run = async () => {
  // setting inDev var
  console.log(`[${module.exports.help.name}] Setting environment variables...`);
  if (fs.existsSync(envFile)) {
    const env = require(`.${envFile}`);
    config.inDev = true;
    config.smtpUsername = env.smtp.username;
    config.smtpPassword = env.smtp.password;
    config.smtpHostAdress = env.smtp.hostAdress;
    config.smtpPort = env.smtp.port;
    config.smtpSSLRequired = env.smtp.SSLRequired;
    config.interval = env.checkingInterval;
    config.monitoringEmail = env.monitoringEmail;
  } else {
    config.inDev = false;
    config.smtpUsername = process.env.smtpUsername;
    config.smtpPassword = process.env.smtpPassword;
    config.smtpHostAdress = process.env.smtpHostAdress;
    config.smtpPort = process.env.smtpPort;
    config.smtpSSLRequired = process.env.smtpSSLRequired;
    config.interval = process.env.checkingInterval;
    config.monitoringEmail = process.env.monitoringEmail;
  }
  console.log(`[${module.exports.help.name}] Environment variables set!`);
};

module.exports.help = {
  name: 'STARTUP_envPrep',
};
