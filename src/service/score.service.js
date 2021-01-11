const db = require('../helper/mongoDb');
const { updateUserScore } = require('./redis.service');



async function submitScore(params, origin) {
    return await updateUserScore(params.id, params.point).then(() => {
        return { score_worth: params.point, user_id: params.id, timestamp: Date.now() };
    }).catch((err) => { return { message: err, isError: true } });

}

module.exports = {
    submitScore
}

