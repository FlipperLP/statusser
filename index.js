const puppeteer = require('puppeteer');

const config = require('./config/main.json');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setCookie(config.downdetector.consentCookie);
  await page.goto('https://allesungen.de/stoerung/1-und-1/');
  // await page.pdf({ path: './testing/withoutconsent.pdf', format: 'A4' });

  // logo
  // const [output] = await page.$x('/html/body/div[3]/div[2]/div[1]/div[1]/div/a[1]/img[1]');
  // downswitch
  // const [output] = await page.$x('/html/body/div[3]/div[2]/div[1]/div[1]/div/a[1]/img[2]');
  // text
  // //*[@id="company"]/div[1]/div/div[1]
  // /html/body/div[3]/div[2]/div[1]/div[1]/div/div[1]
  // const [output] = await page.$x('//*[@id="company"]/div[1]/div/div[1]');
  const [output] = await page.$x('//*[@id="company"]/div[1]/div/div[1]');
  // const text = await output.getProperty('innerText');
  const text = await output.getProperty('');
  const down = await text.jsonValue();
  console.log(down);

  await page.close();
  await browser.close();
})();
