const puppeteer = require('puppeteer');

const config = require('../config/main.json');

// "domain": ".xn--allestrungen-9ib.de",

async function getPage(endpoint, service) {
  const browser = await puppeteer.launch({ headless: config.env.get('inDev') });
  const page = await browser.newPage();
  await page.setCookie(config.downdetector.consentCookie);
  await page.goto('https://downdetector.pk/status/ea/');
  return page;
}

module.exports.run = async () => {
  const page = await getPage();

  // await page.pdf({ path: './testing/withoutconsent.pdf', format: 'A4' });

  const [output] = await page.$x('//*[@id="company"]/div[1]/div/div[1]');
  // const text = await output.getProperty('innerText');

  const problemButton = await page.evaluate(() => document.querySelector('a.btn.btn-danger.mt-2.px-4.py-3.shadow.mb-2'));
  if (!problemButton) {
    await page.close();
    await browser.close();
    return null;
  }
  const statusDanger = await page.evaluate(() => document.querySelector('.color-danger'));
  const statusWarning = await page.evaluate(() => document.querySelector('.color-warning'));

  const text = await output.getProperty('');
  const down = await text.jsonValue();
  console.log(down);

  await page.close();
  await browser.close();
};

module.exports.help = {
  name: 'FUNC_checkStatus',
};
