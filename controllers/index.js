const User = require('../models/user');
const passport = require('passport');

module.exports = {
    index
};

function index(req, res) {
    User.find({}, function(err, users) {
        res.render('index', {
            users,
            user: req.user,
            title: 'Drugs Review'}
        );
    });
}