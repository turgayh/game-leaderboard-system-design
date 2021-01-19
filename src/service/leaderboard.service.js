const { getUserById } = require('./dynamo.service')
const { getLeaderboard, getUserRank } = require('../service/redis.service')
const { isoCountries } = require('../helper/country-code');

// global leaderboard
async function globalLeaderboard(params) {
    let result = []
    let leaderboard = await getLeaderboard(params.country, params.size).then(leaderboard => { return leaderboard }).catch((err) => { return err });

    await asyncForEach(leaderboard, async (num) => {
        let info = await prepareResponse(num);
        if (info)
            result.push(info);
    });


    return result;

}


async function leaderboardByCountryCode(params, country_code) {
    let result = []
    let leaderboard = await getLeaderboard(country_code, params.size).then(leaderboard => { return leaderboard }).catch((err) => { return err });
    await asyncForEach(leaderboard, async (num) => {
        let info = await prepareResponse(num);
        if (info)
            result.push(info);
    });
    return result;
}


async function prepareResponse(data) {
    if (data !== undefined && data.user_id !== undefined) {
        let score = 0;
        let name = "";
        let country_name = "";
        let user = await getUserById(data.user_id);

        if (user) {
            name = user.display_name;
            country_name = user.country;
            let rankUser = await getUserRank(data.user_id, isoCountries.GLOBAL).then((resRank) => { return resRank });
            return { rank: rankUser, points: data.points, display_name: name, country: country_name };
        }
        else {
            return false
        }
    }
    return false;
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

module.exports = {
    globalLeaderboard,
    leaderboardByCountryCode,
}
