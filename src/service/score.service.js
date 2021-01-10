
module.exports = { createUser, getProfile }
const db = require('../helper/mongoDb');



async function submitScore(user_id, score, origin) {

}

async function getProfile(id, origin) {
    let profile = db.User.findOne({ user_id: id })
    return profile;
}


