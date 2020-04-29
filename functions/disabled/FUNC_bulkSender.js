const Email = require('../../database/models/email');

const config = require('../../config/main.json');


async function getEmails(serviceID) {
  const result = await Email.findAll({ where: { serviceID, notified: false } }).catch(errHander);
  return result;
}

async function resetEmails(serviceID) {
  const result = await Email.update({ notified: false }, { where: { serviceID, notified: true } }).catch(errHander);
  return result;
}

async function triggerEmails(serviceID) {
  const result = await Email.update({ notified: true }, { where: { serviceID, notified: false } }).catch(errHander);
  return result;
}

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
