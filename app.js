const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan')

const cluster = require('cluster');
const cpuCount = 2;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'))


// api routes
app.use('/user', require('./src/controller/user.controller'));
app.use('/score', require('./src/controller/score.controller'));
app.use('/leaderboard', require('./src/controller/leaderboard.controller'));

app.listen(process.argv[2] || process.env.PORT || 4500, () => {
    console.log(`Uygulama ayakta ve ${process.argv[2] || process.env.PORT || 4500} nolu porttan dinlemede.`);
});


// if (cluster.isMaster) {
//     console.log('Master PID: ' + process.pid);
//     for (var i = 0; i < cpuCount; i++) {
//         cluster.fork();
//     }

//     cluster.on('fork', function (worker) {
//         console.log('\tfork (worker ' + worker.process.pid + ')');
//     });

//     cluster.on('online', function (worker) {
//         console.log('\tonline (worker ' + worker.process.pid + ')');
//     })

//     cluster.on('listening', function (worker, address) {
//         console.log('\tlistening (worker ' + worker.id + ') pid ' + worker.process.pid + ', ' + address.address + ':' + address.port + ')');
//     });

//     cluster.on('exit', function (worker) {
//         console.log('\texit (worker ' + worker.process.pid + ')');
//     });

// } else {

//     console.log('Worker # has been' + process.pid + ' started.');
//     // start server
//     app.listen(process.argv[2] || process.env.PORT || 4500, () => {
//         console.log(`Uygulama ayakta ve ${process.argv[2] || process.env.PORT || 4500} nolu porttan dinlemede.`);
//     });
// }



