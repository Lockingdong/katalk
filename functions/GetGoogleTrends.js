const redis = require("redis");
const { promisifyAll } = require('bluebird');
promisifyAll(redis);


async function getGoogleTrends() {
    try {
        const client = redis.createClient({host: 'redis', port: '6379'});

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