const redis = require("redis");
const db = require('../helper/mongoDb');

const { getLeaderboard, getUserRank } = require('../service/redis.service')
const { isoCountries } = require('../helper/country-code');

// global leaderboard
async function globalLeaderboard(params, origin) {
    let result = await getLeaderboard(params.country, params.size).then(leaderboard => { return leaderboard }).catch((err) => { return err });
    return prepareResponse(result)
}

async function leaderboardByCountryCode(params, country_code, origin) {
    let result = await getLeaderboard(country_code, params.size).then(leaderboard => { return leaderboard }).catch((err) => { return err });
    return prepareResponse(result)
}


async function prepareResponse(data) {
    let result = []
    await data.forEach(val => {
        if (val !== undefined && val.user_id !== undefined) {
            let score = 0;
            let name = "";
            let country_name = "";
            db.User.find({ user_id: val.user_id }, function (err, value) {
                if (value !== undefined) {
                    // score = value.points;
                    name = value.display_name;
                    country_name = value.country;
                }
            });
            let rankUser = getUserRank(val.user_id, isoCountries.GLOBAL).then((resRank) => { return resRank });
            result.push({ rank: rankUser, points: score, display_name: name, country: country_name })
        }
    });
    return result;
}

module.exports = {
    globalLeaderboard,
    leaderboardByCountryCode,
    prepareResponse
}
