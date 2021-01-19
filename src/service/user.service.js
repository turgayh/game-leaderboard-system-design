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
        return createOrUpdateUser(params);
    }).catch((err) => { return err });
}

// get information about user
async function getProfile(id) {
    let profile = await getUserById(id);
    let rank = await getUserRank(id, isoCountries.GLOBAL).then((resRank) => { return resRank });
    let score = await getUserScore(id).then((resScore) => { return resScore });
    return { user_id: profile.user_id, display_name: profile.display_name, points: score, rank: rank };
}




module.exports = { createUser, getProfile }