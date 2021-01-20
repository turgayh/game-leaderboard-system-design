const { redisClient } = require('../helper/redis-db')
const { isoCountries, getCountryName } = require('../helper/country-code')
const { updateUserScore } = require('../service/dynamo.service')

async function submitScore(params) {
    try {
        let countryName = getCountryName(params.country)
        //Update score in db 
        let isSuccess = await updateUserScore(params.user_id, params.points, countryName);
        //Update score in redis
        if (isSuccess) {
            redisClient.zadd(countryName, params.points, params.user_id);
            redisClient.zadd(isoCountries.GLOBAL, params.points, params.user_id);
        } else {
            return { isError: true, message: "user not found!" }
        }
        return { score_worth: params.points, user_id: params.user_id, timestamp: Date.now() }
    }
    catch (err) {
        return err
    }
}

module.exports = {
    submitScore
}

