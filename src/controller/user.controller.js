
const express = require('express');
const router = express.Router();

router.post('/create', register);
router.get('/profile', getProfile);


module.exports = router;

const userService = require('../service/user.service');

function register(req, res, next) {
    userService.createUser(req.body, req.get('origin'))
        .then((user) => res.json(user))
        .catch(() => res.json({ message: 'failue' }))
}


function getProfile(req, res, next) {
    userService.getProfile(req.query.user_id, req.get('origin'))
        .then((profile) => res.json(profile))
        .catch(() => res.json({ message: 'failue' }))
}
