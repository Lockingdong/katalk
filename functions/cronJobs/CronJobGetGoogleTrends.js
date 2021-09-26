const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const redis = require("redis");
const dotenv = require('dotenv').config()
const { promisifyAll } = require('bluebird');
promisifyAll(redis);
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

    const client = await redis.createClient({host: dotenv.parsed.APP_REDIS_HOST});

    await client.setAsync('google_trends', JSON.stringify(titles), 'EX', 60 * 60 * 48);

    await client.quitAsync();

    Logger.info('getTrends success')

}


module.exports = CronJobGetGoogleTrends;