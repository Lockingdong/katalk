const redis = require("redis");
const { promisifyAll } = require('bluebird');
promisifyAll(redis);
const dotenv = require('dotenv').config()
const Logger = require('./Logger')


async function getGoogleTrends() {
    try {
        const client = await redis.createClient({host: dotenv.parsed.APP_REDIS_HOST});

        let cachedTitles = []

        cachedTitles = JSON.parse(await client.getAsync("google_trends"))

        await client.quitAsync();

        let shuffled = cachedTitles.sort(() => 0.5 - Math.random());

        let selected = shuffled.slice(0, 5);

        return selected
        
    } catch (error) {

        Logger.error('getGoogleTrends ' + error.toString())

        return [];
    }
}

module.exports = getGoogleTrends