
const express = require('express');
const router = express.Router();
const { submitScore } = require('../service/score.service')


router.post('/submit', scoreSubmit);

module.exports = router;


function scoreSubmit(req, res, next) {
    submitScore(req.body, req.get('origin'))
        .then((response) => res.json(response))
        .catch(next)
}

