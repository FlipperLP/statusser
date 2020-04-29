const { Op } = require('sequelize');

const Service = require('../database/models/service');

const Email = require('../database/models/email');

const config = require('../config/main.json');

const errHander = (err) => { functions.FUNC_errHandler.run(err); };

async function getServices() {
  const result = await Service.findAll({ where: { [Op.not]: { currentStatus: -1 } } }).catch(errHander);
  return result;
}

async function setServiceStatus(serviceID, currentStatus) {
  const result = await Service.update({ currentStatus }, { where: { serviceID } }).catch(errHander);
  return result;
}

function statusSwitch(status, service, functions) {
  switch (status) {
    case 'up':
      if (service.currentStatus === 0) return;
      setServiceStatus(service.serviceID, 0);
      return;
    case 'warn':
      if (service.currentStatus === 1) return;
      setServiceStatus(service.serviceID, 1);
      return;
    case 'down':
      if (service.currentStatus === 2) return;
      setServiceStatus(service.serviceID, 2);
      return;
    default:
      // errHander(`${status} on serviceID ${service.serviceID} (${service.serviceName})`);
      functions.FUNC_errHandler.run(`${status} on serviceID ${service.serviceID} (${service.serviceName})`);
      setServiceStatus(service.serviceID, -1);
      return;
  }
}

async function checkServices(functions) {
  const services = await getServices();
  services.forEach((service, i) => {
    setTimeout(async () => {
      if (config.inDev) console.log(`[${module.exports.help.name}] Checking service ${service.serviceName}...`);
      const status = await functions.FUNC_checkStatus.run(service.endpointCode, service.serviceName);
      if (config.inDev) console.log(`[${module.exports.help.name}] Service ${service.serviceName} is ${status}`);
      statusSwitch(status, service, functions);
    }, i * config.interval);
  });
  console.log('---------------');
}

module.exports.run = async (functions) => {
  const services = await getServices();
  await checkServices(functions);
  setInterval(checkServices, services.length * config.interval, functions);
};

module.exports.help = {
  name: 'TCKR_downdetector',
};
