const express = require('express');
const router = express.Router();
const passport = require('passport');
const indexCtrl = require('../controllers/index');

router.get('/', indexCtrl.index);
router.get('/about', indexCtrl.about);
router.get('/contact', indexCtrl.contact);
router.get('/report', indexCtrl.report);
router.post('/report', indexCtrl.submitReport);
router.post('/contact', indexCtrl.submitContact);
router.post('/search', indexCtrl.search);

router.get('/auth/google', passport.authenticate(
    'google',
    { scope: ['profile', 'email']}
));

router.get('/oauth2callback', passport.authenticate(
    'google',
    {   //Should return user to current page or home
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