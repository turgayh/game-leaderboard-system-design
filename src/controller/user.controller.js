
const express = require('express');
const router = express.Router();

/// display_name , points, rank , user_id
router.post('/create', createUser);

/// display_name , points, rank , user_id
router.get('/profile/:id', getProfile);


module.exports = router;

const userService = require('../service/user.service');

function createUser(req, res, next) {
    userService.createUser(req.body, req.get('origin'))
        .then((user) => res.json(user))
        .catch(() => res.json({ message: 'failue' }))
}


function getProfile(req, res, next) {
    userService.getProfile(req.params['id'], req.get('origin'))
        .then((profile) => res.json(profile))
        .catch(() => res.json({ message: 'failue' }))
}
