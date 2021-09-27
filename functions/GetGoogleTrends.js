const Logger = require('./Logger')


async function getGoogleTrends() {
    try {

        let cachedTitles = GOOGLE_TRENDS;

        let shuffled = cachedTitles.sort(() => 0.5 - Math.random());

        let selected = shuffled.slice(0, 5);

        return selected
        
    } catch (error) {

        Logger.error('getGoogleTrends ' + error.toString())

        return [];
    }
}

module.exports = getGoogleTrends