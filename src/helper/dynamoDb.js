var AWS = require("aws-sdk");
var { createUUID } = require('../helper/common-function')

// Localhost dynamodb
AWS.config.update({
    region: "macera",
    endpoint: "http://localhost:8000"
});

// Create Table
// var dynamodb = new AWS.DynamoDB();
// var params = {
//     TableName: "Users",
//     KeySchema: [
//         { AttributeName: "user_id", KeyType: "HASH" },  //Partition key
//     ],
//     AttributeDefinitions: [
//         { AttributeName: "user_id", AttributeType: "S" },
//     ],
//     ProvisionedThroughput: {
//         ReadCapacityUnits: 5,
//         WriteCapacityUnits: 5
//     }
// };
// dynamodb.createTable(params, function (err, data) {
//     if (err) {
//         console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
//     }
// });


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