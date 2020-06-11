const Drug = require('../models/drug');
const User = require('../models/user');
const request = require('request');

module.exports = {
    index,
    new: newDrug,
    create,
    show
};

function show(req, res) {
    User.find({}, function(err, users) {
        Drug.findById(req.params.id).exec(function(err, drug) {
            res.render('drugs/show', {
                users,
                drug,
                user: req.user,
                title: 'Show Drug'
            });
        });
    });
}

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    // Convert generic to a boolean
    req.body.generic = req.body.generic.value === "Yes";
    const drug = new Drug(req.body);
    drug.save(function(err) {
        if(err) {
            return res.redirect('/drugs/new'); // FIX ME: ADD TOASTS
         }
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


//Async-await find an API
// async function getDrugData(userParam) {
//     const response = await fetch(`LINK${userParam}`);
//     const data = await response.json();
//     console.log(data);
// }

//Async await instead
async function index(req, res) {
    try {
        const drugs = await Drug.find({});
        const users = await User.find({});
        res.render('drugs/index', {
                    drugs,
                    users,
                    user: req.user,
                    title: 'Drugs List', 
        });
    } catch (error) {
        console.log(error);
        res.redirect('/'); //FIXME: Add error handler here, can test error by making User above to Users
    }
}


// Get all the drugs
// function index(req, res) {
//     Drug.find({}, function(err, drugs) {
//         User.find({}, function(err, users) {
//             res.render('drugs/index', {
//                 drugs,
//                 users,
//                 user: req.user,
//                 title: 'Drugs List', 
//             });
//         });
//     });
// }

// Promises instead of callback functions
// function index(req, res) {
//     Drug.find({}).then(drugs => {
//         User.find({}).then(users => {
//             res.render('drugs/index', {
//                 drugs,
//                 users,
//                 user: req.user,
//                 title: 'Drugs List', 
//             })
//         }).catch(err => {
//             res.redirect('error'); //FIXME: Create error template
//         });
//     });
// }

// Promises example FIXME: Add API
// function getDrugData(userParam) { //amount `omdb.com/api?=${amount}...
//     fetch(`LINK${userParam}`).then(response => response.json()).then(data => console.log(data));    
// }
