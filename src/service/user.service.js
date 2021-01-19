const { createUUID } = require('../helper/common-function')
const { addUserToRedis, getUserRank, getUserScore } = require('./redis.service');
const { getCountryName, isoCountries } = require('../helper/country-code');
const { createOrUpdateUser, getUserById } = require('./dynamo.service')




/// Create new user
async function createUser(params) {
    let user_id = createUUID();
    params.user_id = user_id;
    params.country = params.country.toUpperCase();
    return addUserToRedis(user_id, params.country).then((rank) => {
        params.rank = rank;
        params.country = getCountryName(params.country);
        return createOrUpdateUser(params).then((res) => { return res });
    }).catch((err) => console.log(err));
}

async function getProfile(id) {
    let profile;
    getUserById(id).then((res) => { profile = res });
    console.log(profile);
    let rank = await getUserRank(id, isoCountries.GLOBAL).then((resRank) => { return resRank });
    let score = await getUserScore(id).then((resScore) => { return resScore });
    profile.rank = rank;
    profile.points = score;
    return profile;
}




module.exports = { createUser, getProfile }