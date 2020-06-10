const Drug = require('../models/drug');
const User = require('../models/user');
const request = require('request');

module.exports = {
    index,
    new: newDrug,
    create
};

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    // Convert generic to a boolean
    req.body.generic = req.body.generic.value === "Yes";
    const drug = new Drug(req.body);
    drug.save(function(err) {
        if(err) {
            console.log(err);
            console.log(drug);
            return res.redirect('/drugs/new'); // FIX ME: ADD TOASTS
         } 
        console.log(drug);
        res.redirect(`/drugs`); // FIX ME: ADD SHOW PAGE and go here
    });
}

function newDrug(req, res) {
    User.find({}, function(err, users) {
        res.render('drugs/new', {
            users,
            user: req.user,
            title: 'Add New Drug'
        });
    });
}

// Get all the drugs
function index(req, res) {
    Drug.find({}, function(err, drugs) {
        User.find({}, function(err, users) {
            res.render('drugs/index', {
                drugs,
                users,
                user: req.user,
                title: 'Drugs List', 
            });
        });
    });
}