const CronJob = require('cron').CronJob;
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const redis = require("redis");

module.exports = function() {

    // 每天早上 9 點抓資料
    const getTrends = new CronJob('0 0 9 * * *', async function() {

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

        const client = redis.createClient({host: '0.0.0.0', port: '6379'});

        await client.set('google_trends', JSON.stringify(titles));

        client.quit();

    }, null, true, 'Asia/Taipei');

    getTrends.start()

}
