
const express = require('express');
const router = express.Router();

router.post('/create', register);

module.exports = router;

const userService = require('../service/user.service');

function register(req, res, next) {
    userService.createUser(req.body, req.get('origin'))
        .then(() => res.json({ message: 'success' }))
        .catch(() => res.json({ message: 'failue' }))
}