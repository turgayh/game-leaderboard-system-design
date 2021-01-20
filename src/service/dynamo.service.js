var AWS = require("aws-sdk");

// Localhost dynamodb
AWS.config.update({
    region: "local",
    endpoint: process.env.dynamoDbEndPoint
});
var docClient = new AWS.DynamoDB.DocumentClient();


const updateUserScore = async (id, score, country) => {
    if (score === undefined || score === "")
        score = 0;
    var params = {
        TableName: "Users",
        Key: {
            "user_id": id,
        },
        UpdateExpression: 'set points = :newScore,  update_time = :update_date',
        ConditionExpression: 'country = :country',
        ExpressionAttributeValues: {
            ':newScore': score,
            ':country': country,
            ':update_date': Date.now()
        },

    };

    try {
        await docClient.update(params).promise()
        return true;
    } catch (error) {
        return false;
    }
}

const createOrUpdateUser = async (data, id) => {
    data.points = 0;

    var params = {
        TableName: "Users",
        Item: {
            "user_id": id,
            "display_name": data.display_name,
            "points": data.points,
            "update_time": Date.now(),
            "country": data.country,
        }
    };
    try {
        await docClient.put(params).promise()
        return { user_id: id, display_name: data.display_name, points: data.points, rank: data.rank, country: data.country };
    } catch (error) {
        return { isError: true, message: error };
    }

}


async function getUserById(id) {
    try {
        var params = {
            TableName: "Users",
            Key: {
                "user_id": id
            }
        };
        return (await docClient.get(params).promise()).Item
    } catch (error) {
        return false;
    }
}




module.exports = { createOrUpdateUser, getUserById, updateUserScore };