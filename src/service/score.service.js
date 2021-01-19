const redis = require("redis");
const client = redis.createClient();
const { isoCountries } = require('../helper/country-code')
const { getUserById } = require('../service/dynamo.service')
async function submitScore(params, origin) {
    try {
        let countryName;
        await getUserById(params.user_id).then((res) => {
            countryName = res.country;
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

