
const express = require('express');
const router = express.Router();
const { submitScore } = require('../service/score.service')
const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');


router.post('/submit', scoreSubmitValidation, scoreSubmit);

module.exports = router;


function scoreSubmitValidation(req, res, next) {
    const validate = Joi.object({
        user_id: Joi.required(),
        point: Joi.required()
    });
    validateRequest(req, next, validate);
}

function scoreSubmit(req, res, next) {
    submitScore(req.body, req.get('origin'))
        .then((response) => res.json(response))
        .catch(next)
}

