const puppeteer = require('puppeteer');

const config = require('../config/main.json');

// gets config Endpoint
function getEndpoint(endpointCode) {
  return config.downdetector.endpoints[endpointCode];
}

// closes page safely
async function closePage(browser, page) {
  await page.close();
  await browser.close();
}

// requests website with requered service
async function getPage(endpoint, service) {
  const browser = await puppeteer.launch({ headless: config.env.get('inDev') });
  const page = await browser.newPage();
  await page.setCookie(config.downdetector.consentCookie);
  await page.goto(`${endpoint}${service}/`);
  return [browser, page];
}

module.exports.run = async (endpointCode, service) => {
  // get endpoint adress from config and check if exists
  const endpointAdress = await getEndpoint(endpointCode);
  if (!endpointAdress) return 'noEndpoint';
  const [browser, page] = await getPage(endpointAdress, service);
  // DISABLED: not in use
  // await page.pdf({ path: './testing/withoutconsent.pdf', format: 'A4' });

  // check if page is a stauts page
  const problemButton = await page.evaluate(() => document.querySelector('a.btn.btn-danger.mt-2.px-4.py-3.shadow.mb-2'));
  if (!problemButton) {
    await closePage(browser, page);
    return 'noServiceByName';
  }

  // get status by color
  // const statusDanger = await page.evaluate(() => document.querySelector('.color-danger'));
  // const statusWarning = await page.evaluate(() => document.querySelector('.color-warning'));

  // prepare return value
  let finalStatus = 200;
  if (await page.evaluate(() => document.querySelector('.color-danger'))) finalStatus = 'down';
  if (await page.evaluate(() => document.querySelector('.color-warning'))) finalStatus = 'warn';
  await closePage(browser, page);
  return finalStatus;
};

module.exports.help = {
  name: 'FUNC_checkStatus',
};
