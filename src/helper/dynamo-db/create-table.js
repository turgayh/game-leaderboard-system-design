var AWS = require("aws-sdk");
require('dotenv').config();

// Localhost dynamodb
AWS.config.update({
    region: "local",
    endpoint: process.env.dynamoDbEndPoint
});

//Create Users 
var dynamodb = new AWS.DynamoDB();
var params = {
    TableName: "Users",
    KeySchema: [
        { AttributeName: "user_id", KeyType: "HASH" },  //Partition key
    ],
    AttributeDefinitions: [
        { AttributeName: "user_id", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};
dynamodb.createTable(params, function (err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created Users table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});