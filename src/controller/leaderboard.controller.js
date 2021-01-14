const express = require('express');
const router = express.Router();
const { globalLeaderboard } = require('../service/leaderboard.service')

router.get('/', scoreSubmit);

module.exports = router;


function scoreSubmit(req, res, next) {
    globalLeaderboard(req.body, req.get('origin'))
        .then((response) => res.json(response))
        .catch(next)
}

