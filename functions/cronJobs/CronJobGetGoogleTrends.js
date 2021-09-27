const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const Logger = require('../Logger')

const CronJobGetGoogleTrends = async () => {

    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto('https://trends.google.com.tw/trends/?geo=TW');
    await page.waitForSelector('.list-item-title')

    let body = await page.content()

    let $ = await cheerio.load(body)

    let titles = [];

    await $('.list-item-title').each(function(idx, el) {
        titles.push($(this).text());
    })

    // console.log(titles)

    await browser.close();

    GOOGLE_TRENDS = titles;

    Logger.info('getTrends success')

}


module.exports = CronJobGetGoogleTrends;