const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function getGoogleTrends() {
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

        await browser.close();

        // Shuffle array
        let shuffled = titles.sort(() => 0.5 - Math.random());

        // Get sub-array of first n elements after shuffled
        let selected = shuffled.slice(0, 5);

        return selected
        
    } catch (error) {
        console.error(error);

        return [];
    }
}

module.exports = getGoogleTrends