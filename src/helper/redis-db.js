const redis = require("redis");
require('dotenv').config();
const redisClient = redis.createClient(process.env.redisConnectionString);
module.exports = { redisClient }