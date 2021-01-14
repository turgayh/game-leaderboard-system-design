const config = require('../../config/config.json');
const db = require('../helper/mongoDb');
const { createUUID } = require('../helper/common-function')
const { addUserToRedis, getUserRank, getUserScore } = require('./redis.service');
const redis = require("redis");
const { getCountryName, isoCountries } = require('../helper/country-code');
const client = redis.createClient();

client.on("error", function (error) {
    console.error(error);
});



/// Create new user
async function createUser(params, origin) {
    params.user_id = createUUID();
    params.country = params.country.toUpperCase();
    return addUserToRedis(params.user_id, params.country).then((rank) => {
        params.rank = rank;
        params.country = getCountryName(params.country);
        let user = new db.User(params);
        return user.save()
    }).catch((err) => console.log(err));

}

async function getProfile(id, origin) {
    let profile = await db.User.findOne({ user_id: id })
    let rank = await getUserRank(id, isoCountries.GLOBAL).then((resRank) => { return resRank });
    let score = await getUserScore(id).then((resScore) => { return resScore });
    profile.rank = rank;
    profile.points = score;
    return profile;
}

async function getUserDisplayName(id) {
    let user = await db.User.findOne({ user_id: id });

}


module.exports = { createUser, getProfile, getUserDisplayName }