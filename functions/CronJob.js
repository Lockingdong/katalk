const CronJob = require('cron').CronJob;
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const redis = require("redis");
const dotenv = require('dotenv').config()
const Logger = require('./Logger')

module.exports = function() {

    // 每天早上 9 點抓資料
    const getTrends = new CronJob('0 0 9 * * *', async function() {

        try {
            
            const browser = await puppeteer.launch();
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

            await client.setAsync('google_trends', JSON.stringify(titles));

            await client.quitAsync();

        } catch (error) {

            Logger.error('getTrends ' + error.toString())
                
        }

    }, null, true, 'Asia/Taipei');

    getTrends.start()

}
