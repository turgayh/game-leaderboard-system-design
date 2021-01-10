

module.exports = { createUser, getProfile }
const config = require('../../config/config.json');
const db = require('../helper/mongoDb');
const { createUUID } = require('../helper/common-function')

const redis = require("redis");
const client = redis.createClient();

client.on("error", function (error) {
    console.error(error);
});


async function createUser(params, origin) {
    params.user_id = createUUID();
    const user = new db.User(params);
    client.zadd("global", 0, params.user_id);
    let x = client.zrevrank(params.user_id, "global")
    console.log(x);
    return user.save()
}

async function getProfile(id, origin) {
    let profile = db.User.findOne({ user_id: id })
    return profile;
}


