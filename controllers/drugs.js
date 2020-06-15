const Drug = require('../models/drug');
const User = require('../models/user');
const moment = require('moment');
const request = require('request');
let showDrug, userQuery;
let options = {
    method: 'GET',
    url:'https://iterar-mapi-us.p.rapidapi.com/api/' + showDrug + '/substances.json',
    headers: {
        'x-rapidapi-host': 'iterar-mapi-us.p.rapidapi.com',
        'x-rapidapi-key': '88f91a3130msh91c28237cd492bap1876a5jsn00d4c51c5111',
        useQueryString: true
    }
};
let serpOptions = {
    method: 'GET',
    url:'https://app.zenserp.com/api/v2/search?q=' + userQuery + '&apikey=f3b1a770-aec5-11ea-8bc1-3f6cfb6956fc&tbm=isch'
};

module.exports = {
    index,
    new: newDrug,
    create,
    show,
    addLike,
    removeLike
};

function removeLike(req, res) {
    console.log(SERP_KEY)
    Drug.findById(req.params.id, function(err, drug) {
        for(let i = 0; i < req.user.liked.length; i++) {
            if(req.user.liked[i] === drug.name) {
                req.user.liked.splice(i, 1);
            }
        }
        drug.likedCount -= 1;
        drug.save(function(err) {
            if(err) console.log(err);
            req.user.save(function(err) {
                if(err) console.log(err);
                res.redirect(`/drugs/${drug._id}`);
            })
        })
    })
}

function addLike(req, res) {
    Drug.findById(req.params.id, function(err, drug) {
        let alreadyFaved = false;
        for(let i = 0; i < req.user.liked.length; i++) {
            if(req.user.liked[i] === drug.name) {
                alreadyFaved = true;
            }
        }
        if(alreadyFaved) {
            return res.redirect(`/drugs/${drug._id}`);
        }
        drug.likedCount += 1;
        req.user.liked.push(drug.name);
        req.user.save(function(err) {
            if(err) console.log(err);
            drug.save(function(err) {
                if(err) console.log(error);
                res.redirect(`/drugs/${drug._id}`);
            })
        })

    })
}

async function show(req, res) {
    try {
        const users = await User.find({});
        const drug = await Drug.findById(req.params.id);
        // Update the URL for the api request
        showDrug = await drug.name;
        options.url = "https://iterar-mapi-us.p.rapidapi.com/api/" + showDrug + "/substances.json"
        request(options, function(err, response, body) {
            res.render('drugs/show', {
                users,
                drug,
                user: req.user,
                title: 'Drug.io | View',
                moment,
                body
            });
        });
    } catch (error) {
        console.log(error)
        res.redirect('back')
    }
}

function create(req, res) {
    Drug.find({}, function(err, drugs) {
        let imageUrl;
        let newVar = req.body.name;
        newVar = newVar.toLowerCase();
        for(let i = 0; i < drugs.length; i++) {
            let drugName = drugs[i].name.toLowerCase()
            if(drugName === newVar) {
                return res.redirect('back');
            }
        }
        for (let key in req.body) {
            if (req.body[key] === '') delete req.body[key];
        }
        // Convert generic to a boolean
        req.body.generic = req.body.generic.value === "Yes";
        // Set the URL to be used to parse for images
        if(!req.body.image) {
            serpOptions.url = 'https://app.zenserp.com/api/v2/search?q=' + newVar + '&apikey=f3b1a770-aec5-11ea-8bc1-3f6cfb6956fc&tbm=isch'
            request(serpOptions, function(err, response, body) {
                newObj = JSON.parse(body);
                imageUrl = newObj.image_results[0].sourceUrl;
                req.body.image = imageUrl;
                console.log(imageUrl);
                console.log(req.body.image);
                const drug = new Drug(req.body);
                console.log(drug);
                drug.image = imageUrl;
                drug.save(function(err) {
                    if(err) return res.redirect('back');
                    res.redirect(`/drugs/${drug._id}`);
                });
            });
        } else {        
            const drug = new Drug(req.body);
            drug.save(function(err) {
                if(err) return res.redirect('back');
                res.redirect(`/drugs/${drug._id}`);
            });
        }
    });
}

function newDrug(req, res) {
    User.find({}, function(err, users) {
        res.render('drugs/new', {
            users,
            user: req.user,
            title: 'Drug.io | Add a Drug'
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
                    title: 'Drug.io | View All', 
        });
    } catch (error) {
        console.log(error);
        res.redirect('back'); //FIXME: Add error handler here, can test error by making User above to Users
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
