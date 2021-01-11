const redis = require("redis");
const client = redis.createClient();



/// Get user rank in Redis
const getUserRank = (id, rankingArea) => new Promise(function (resolve, reject) {
    client.zrank(rankingArea, id, function (err, index) {
        if (!err)
            resolve(index + 1) // return rank
        else
            resolve(-1) //
        reject('error');
    });
})

/// Get user score in Redis
const getUserScore = (id) => new Promise(function (resolve, reject) {

    client.zscore('global', id, function (err, score) {
        if (!err)
            resolve(score) // return rank
        else
            resolve(0) //
        reject('error');
    });
})

//TODO
// Update user score in Redis
const updateUserScore = (id, newScore) => new Promise(function (resolve, reject) {
    client.zadd("global", id, newScore, function (err, score) {
        if (!err)
            resolve(score) // return rank
        else
            resolve(0) //
        reject('error');
    });
})

module.exports = {
    getUserRank,
    getUserScore,
    updateUserScore
}