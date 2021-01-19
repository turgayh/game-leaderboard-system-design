var AWS = require("aws-sdk");
var { createUUID } = require('../helper/common-function')

// Localhost dynamodb
AWS.config.update({
    region: "macera",
    endpoint: "http://localhost:8000"
});
var docClient = new AWS.DynamoDB.DocumentClient();

const createOrUpdateUser = async (data) => {
    if (data.points === undefined || data.points === "")
        data.points = 0;
    var params = {
        TableName: "Users",
        Item: {
            "user_id": createUUID(),
            "display_name": data.display_name,
            "points": data.points,
            "update_time": Date.now(),
            "country": data.country,
            "rank": data.rank,
        }
    };
    return await docClient.put(params).promise()
        .then((res) => {
            return {
                display_name: res.Item.display_name,
                user_id: res.Item.user_id,
                country: res.Item.country,
                points: res.Item.points,
                rank: res.Item.rank
            }
        }).catch((err) => {
            return { isError: true, message: err }
        });
}


const getUserById = async (id) => {
    var params = {
        TableName: "Users",
        Key: {
            "user_id": id
        }
    };
    return await docClient.get(params).promise()
        .then((res) => {
            return {
                display_name: res.Item.display_name,
                user_id: res.Item.user_id,
                country: res.Item.country,
                points: res.Item.points,
                rank: res.Item.rank
            }
        }).catch((err) => {
            return { isError: true, message: err }
        });
}


const getUserByDisplayName = async (id) => {
    var params = {
        TableName: "Users",
        Key: {
            "user_id": id
        }
    };
    return await docClient.get(params).promise()
        .then((res) => {
            return {
                display_name: res.Item.display_name,
                user_id: res.Item.user_id,
                country: res.Item.country,
                points: res.Item.points,
                rank: res.Item.rank
            }
        }).catch((err) => {
            return { isError: true, message: err }
        });
}

async function a(id) {
    var params = {
        TableName: "Users",
        Key: {
            "user_id": id
        }
    };

    const data = await docClient.get(params);
    return data;
}

module.exports = { createOrUpdateUser, getUserById, getUserByDisplayName };