const Email = require('../../database/models/email');

const config = require('../../config/main.json');

module.exports.run = async () => {
  // const serviceName = 'vodafone';
  // const emails = ['philip.schaefer311@gmail.com', 'philip.schaefer0@gmail.com', 'schaefer@bitsteps.de'];
  // const status = await functions.FUNC_checkStatus.run('de', serviceName);
  // const text = `The service ${serviceName} is ${status}!`;
  // const html = `<b>${text}</b>`;
  // const output = await functions.FUNC_sendEmail.run(html, text, 'test', emails);
  // console.log(output);
};

module.exports.help = {
  name: 'FUNC_bulkSender',
};
