const redis = require("redis");
const client = redis.createClient();
const { getLeaderboard } = require('../service/redis.service')

// global leaderboard
async function globalLeaderboard(params, origin) {
    let result = await getLeaderboard(params.country, params.size).then(leaderboard => { return leaderboard }).catch((err) => { return err });
    return result
}

module.exports = {
    globalLeaderboard
}
