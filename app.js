const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan')
const errorHandler = require('./src/middleware/error-handle');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'))

//health
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// api routes
app.use('/user', require('./src/controller/user.controller'));
app.use('/score', require('./src/controller/score.controller'));
app.use('/leaderboard', require('./src/controller/leaderboard.controller'));

// global error handler
app.use(errorHandler);

app.listen(process.argv[2] || process.env.PORT || 4500, () => {
  console.log(`Uygulama ayakta ve ${process.argv[2] || process.env.PORT || 4500} nolu porttan dinlemede.`);
});
