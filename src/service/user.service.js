

module.exports = { createUser, getProfile }
const config = require('../../config/config.json');
const db = require('../helper/mongoDb');
const { createUUID } = require('../helper/common-function')
const { updateUserScore, getUserRank, getUserScore } = require('./redis.service');
const redis = require("redis");
const client = redis.createClient();

client.on("error", function (error) {
    console.error(error);
});


const addUserToRedis = (id) => new Promise(function (resolve, reject) {
    client.zadd("global", Math.floor(Math.random() * 9999), id);
    client.zrank("global", id, function (err, index) {
        if (!err)
            resolve(index + 1) // return rank
        else
            resolve(-1) //
        reject('error');
    });
})





/// Create new user
async function createUser(params, origin) {
    params.user_id = createUUID();
    return addUserToRedis(params.user_id).then((rank) => {
        params.rank = rank;
        let user = new db.User(params);
        return user.save()
    }).catch((err) => console.log(err));

}

async function getProfile(id, origin) {
    let profile = await db.User.findOne({ user_id: id })
    let rank = await getUserRank(id, 'global').then((rank) => { return rank });
    let score = await getUserScore(id).then((score) => { return score });
    profile.rank = rank;
    profile.points = score;
    return profile;
}


