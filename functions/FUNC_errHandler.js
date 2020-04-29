const Service = require('../database/models/service');

const config = require('../config/main.json');

module.exports.run = async (err) => {
  console.error(`[${module.exports.help.name}] There has been a runtime error: ${err}`);
  console.error(`[${module.exports.help.name}] Sending error to monitoring...`);
  const text = `Oh no! Statusser has run into an issue! \n\n ${err}`;
  const html = `<b>${text}</b>`;
  await require('./FUNC_sendEmail').run(html, text, 'ERROR', [config.monitoringEmail]);
  console.error(`[${module.exports.help.name}] Email sent!`);
};

module.exports.help = {
  name: 'FUNC_errHandler',
};
