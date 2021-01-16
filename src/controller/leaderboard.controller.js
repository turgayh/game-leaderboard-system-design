const express = require('express');
const router = express.Router();
const { globalLeaderboard, leaderboardByCountryCode } = require('../service/leaderboard.service')
const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');


router.get('/', getLeaderboard);
router.get('/:country_code', getLeaderboardByCountryCode);


module.exports = router;


function getLeaderboard(req, res, next) {
    globalLeaderboard(req.body, req.get('origin'))
        .then((response) => res.json(response))
        .catch(next)
}

function getLeaderboardByCountryCode(req, res, next) {
    leaderboardByCountryCode(req.body, req.params['country_code'], req.get('origin'))
        .then((response) => res.json(response))
        .catch(next)
}

