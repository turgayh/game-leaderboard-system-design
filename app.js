const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// api routes
app.get('/', (req, res) => {
    return res.send('Hello world');
});
app.use('/user', require('./src/controller/user.controller'))


// swagger docs route
//app.use('/api-docs', require('./helper/swagger'));



// start server
app.listen(process.argv[2] || process.env.PORT || 4500, () => {
    console.log(`Uygulama ayakta ve ${process.argv[2] || process.env.PORT || 4500} nolu porttan dinlemede.`);
});
