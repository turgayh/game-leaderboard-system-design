const { getCountryName, isoCountries } = require('../helper/country-code')
const {redisClient} = require('../helper/redis-db')

/// Get user rank in Redis
const getUserRank = (id, rankingArea) => new Promise(function (resolve, reject) {
    redisClient.zrevrank(rankingArea, id, function (err, index) {
        if (!err)
            resolve(index + 1) // return rank
        else
            resolve(-1) //
        reject('error');
    });
})

/// Get user score in Redis
const getUserScore = (id) => new Promise(function (resolve, reject) {

    redisClient.zscore(isoCountries.GLOBAL, id, function (err, score) {
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
    redisClient.zadd(isoCountries.GLOBAL, id, newScore, function (err, score) {
        if (!err)
            resolve(score) // return rank
        else
            resolve(0) //
        reject('error');
    });
})


// New user add to global and country specific redis sorted set and return global rank
const addUserToRedis = (id, country_code) => new Promise(function (resolve, reject) {
    try {
        let countryName = getCountryName(country_code);
        redisClient.zadd(isoCountries.GLOBAL, 0, id);
        redisClient.zadd(countryName, 0, id);
        redisClient.zrank(isoCountries.GLOBAL, id, function (err, index) {
            if (!err)
                resolve(index + 1) // return rank
            else
                resolve(-1) //
        });
    } catch (err) {
        reject(err);
    }
})


// get leaderbaord default value setName = isoCountries.GLOBAL and size = 100
const getLeaderboard = (country_code, size) => new Promise(function (resolve, reject) {
    let setName;
    if (country_code === undefined || country_code === "")
        setName = isoCountries.GLOBAL
    else {
        country_code = country_code.toUpperCase();
        setName = getCountryName(country_code);
    }
    size = size === undefined || size === "" ? 100 : size;
    let result = []
    redisClient.zrevrange(setName, 0, size, 'withscores', function (err, leaderboard) {
        for (let index = 0; index < leaderboard.length; index = index + 2) {
            result.push({ user_id: leaderboard[index], points: leaderboard[index + 1] })
        }
        if (!err) {
            resolve(result)
        }
        else reject(err);
    });
})




module.exports = {
    getUserRank,
    getUserScore,
    updateUserScore,
    addUserToRedis,
    getLeaderboard
}