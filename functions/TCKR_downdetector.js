const Service = require('../database/models/service');

const Email = require('../database/models/email');

const config = require('../config/main.json');

function lop(functions) {
  return console.log(functions);
}

module.exports.run = async (functions) => {
  const serviceName = 'vodafone';
  const emails = ['philip.schaefer311@gmail.com', 'philip.schaefer0@gmail.com', 'schaefer@bitsteps.de'];
  const status = await functions.FUNC_checkStatus.run('de', serviceName);
  const text = `The service ${serviceName} is ${status}!`;
  const html = `<b>${text}</b>`;
  const output = await functions.FUNC_sendEmail.run(html, text, 'test', emails);
  console.log(output);
  setInterval(lop(functions), config.checkingInterval);
};

module.exports.help = {
  name: 'TCKR_downdetector',
};
