const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersCtrl = require('../controllers/users.js');

router.get('/:id', usersCtrl.show);
router.put('/:id', usersCtrl.update);

router.get('/auth/google', passport.authenticate(
    'google',
    { scope: ['profile', 'email']}
));

router.get('/oauth2callback', passport.authenticate(
    'google',
    {
        successRedirect: 'back',
        failureRedirect: 'back',
        failureFlash: true 
    }
));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('back');
})

module.exports = router;