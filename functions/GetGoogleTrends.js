const redis = require("redis");
const { promisifyAll } = require('bluebird');
promisifyAll(redis);
const dotenv = require('dotenv').config()


async function getGoogleTrends() {
    try {
        const client = redis.createClient({host: dotenv.parsed.APP_REDIS_HOST});

        let cachedTitles = []

        cachedTitles = JSON.parse(await client.getAsync("google_trends"))

        client.quit();

        let shuffled = cachedTitles.sort(() => 0.5 - Math.random());

        let selected = shuffled.slice(0, 5);

        return selected
        
    } catch (error) {
        console.error(error);

        return [];
    }
}

module.exports = getGoogleTrends