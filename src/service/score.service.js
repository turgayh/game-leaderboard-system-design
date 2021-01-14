const redis = require("redis");
const client = redis.createClient();
const { isoCountries } = require('../helper/country-code')

async function submitScore(params, origin) {
    try {
        client.zadd(isoCountries.GLOBAL, params.point, params.user_id);
        return { score_worth: params.point, user_id: params.user_id, timestamp: Date.now() }
    }
    catch (err) {
        return { message: "Error", isError: true }

    }
}

module.exports = {
    submitScore
}

