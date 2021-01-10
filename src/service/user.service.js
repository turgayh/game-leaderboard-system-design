

module.exports = { createUser }
const config = require('../../config/config.json');
const db = require('../helper/mongoDb');



async function createUser(params, origin) {
    const user = new db.User(params);
    user.save()
}

async function getUser(id, origin) {
    let user = db.User.findOne({ user_id: id })
    return user;
}