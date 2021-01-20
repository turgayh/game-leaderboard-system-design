const redis = require("redis");
const redisClient = redis.createClient('rediss://default:v82c7mddiahw6m9v@db-redis-nyc1-80147-do-user-8597379-0.b.db.ondigitalocean.com:25061');

module.exports = { redisClient }