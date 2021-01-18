var AWS = require("aws-sdk");
var { createUUID } = require('../helper/common-function')

// Localhost dynamodb
AWS.config.update({
    region: "macera",
    endpoint: "http://localhost:8000"
});

const createOrUpdateUser = (tableName, data) => {
    var docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
        TableName: tableName,
        Item: {
            "user_id": createUUID(),
            "display_name": data.display_name,
            "points": data.points,
            "update_time": Date.now(),
            "country": data.country
        }
    };
    docClient.put(params, function (err, val) {
        if (err) {
            console.error("Unable to add Car", 1, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log(JSON.stringify(val, 2));
        }
    });
}

module.exports = { createOrUpdateUser };