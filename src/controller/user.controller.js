
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');

/// display_name , points, rank , user_id
router.post('/create', createUserValidation, createUser);

/// display_name , points, rank , user_id
router.get('/profile/:id', getProfile);


module.exports = router;

const userService = require('../service/user.service');

function createUserValidation(req, res, next) {
    const validate = Joi.object({
        display_name: Joi.required(),
        country: Joi.required()
    });
    validateRequest(req, next, validate);
}

function createUser(req, res, next) {
    userService.createUser(req.body, req.get('origin'))
        .then((user) => res.json(user))
        .catch(next)
}


function getProfile(req, res, next) {
    userService.getProfile(req.params['id'], req.get('origin'))
        .then((profile) => res.json(profile))
        .catch(next)
}
