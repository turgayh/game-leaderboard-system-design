
const express = require('express');
const router = express.Router();

router.post('/submit', scoreSubmit);
const { submitScore } = require('../service/score.service')

module.exports = router;


function scoreSubmit(req, res, next) {
    submitScore(req.body, req.get('origin'))
        .then((response) => res.json(response))
        .catch(() => res.json({ message: 'failue' }))
}

