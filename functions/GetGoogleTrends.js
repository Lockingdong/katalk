const Logger = require('./Logger')


async function getGoogleTrends(redisClient) {
    try {
        let cachedTitlesStr = await redisClient.getAsync("google_trends")

        let cachedTitles = []

        cachedTitles = JSON.parse(cachedTitlesStr)

        let shuffled = cachedTitles.sort(() => 0.5 - Math.random());

        let selected = shuffled.slice(0, 5);

        return selected
        
    } catch (error) {

        Logger.error('getGoogleTrends ' + error.toString())

        return [];
    }
}

module.exports = getGoogleTrends