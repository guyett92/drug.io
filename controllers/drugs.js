const Drug = require('../models/drug');
const User = require('../models/user');

module.exports = {
    index,
    new: newDrug,
    create
};

function create(req, res) {
    Drug.create(req.body, function(err, newDrug) {
        if(err) {
            return res.render('drugs/new', {title: 'Add a Drug'});
        }
        res.redirect('/drugs'); //FIXME: BRING TO NEW DRUG PAGE
    });
}

//Render the new page FIXME: ADD IMAGE SOURCE & DRUG FAMILIES
function newDrug(req, res) {
    res.render('drugs/new', {title: 'Add a Drug'});
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