const CronJob = require('cron').CronJob;
const Logger = require('./Logger')
const CronJobGetGoogleTrends = require('./cronJobs/CronJobGetGoogleTrends')

module.exports = function() {

    // 每天早上 9 點抓資料
    const getTrends = new CronJob('* * * * * *', async function() {

        try {
            
            await CronJobGetGoogleTrends();

        } catch (error) {

            Logger.error('getTrends ' + error.toString())
                
        }

    }, null, true, 'Asia/Taipei');

    getTrends.start()

}
