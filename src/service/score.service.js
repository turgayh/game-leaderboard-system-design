const redis = require("redis");
const client = redis.createClient();
const { isoCountries } = require('../helper/country-code')
const db = require('../helper/mongoDb');

async function submitScore(params, origin) {
    try {
        let countryName;
        await db.User.find({ user_id: params.user_id }, function (err, value) {
            countryName = value[0].country;
        })
        client.zadd(countryName, params.point, params.user_id);
        client.zadd(isoCountries.GLOBAL, params.point, params.user_id);
        return { score_worth: params.point, user_id: params.user_id, timestamp: Date.now() }
    }
    catch (err) {
        return err
    }
}

module.exports = {
    submitScore
}

