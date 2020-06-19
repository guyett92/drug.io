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

let searchOptions = {
        method: 'GET',
        url: 'https://iterar-mapi-us.p.rapidapi.com/api/autocomplete',
        qs: {query: 'res'},
        headers: {
          'x-rapidapi-host': 'iterar-mapi-us.p.rapidapi.com',
          'x-rapidapi-key': '88f91a3130msh91c28237cd492bap1876a5jsn00d4c51c5111',
          useQueryString: true
        }
}

module.exports = {
    index,
    new: newDrug,
    create,
    show,
    addLike,
    removeLike,
    requestDelete
};

async function requestDelete(req, res) {
    console.log('yes');
    try {
        admin = await User.findById("5eec72fba7a2f518a095da23"); // FIXME: Add to .env and update when database is purged
        console.log(admin.name);
        drug = await Drug.findById(req.params.id);
        console.log(drug.name);
        // Add to admin user's pending drug deletions seen in user page
        admin.pendingDel.push(drug);
        admin.save(await function(err) {
            if(err){
                console.log(err);
                res.redirect('/drugs');
            }
            res.redirect('back');
        })

    } catch(error) {
        console.log(error);
        res.redirect('/drugs');
    }
}

function removeLike(req, res) {
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
                res.redirect(`back`);
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
        let notFound;
        searchOptions.qs.query = req.body.name;
        // Check to see if this drug is a possibility
        request(searchOptions, function(error, resp, bod) {
            newBod = JSON.parse(bod);
            for(let i = 0; i < newBod.suggestions.length; i++) { 
                if(newBod.suggestions[i].toLowerCase() === req.body.name.toLowerCase()) {
                    notFound = false;
                } else {
                    notFound = true;
                }
            }
            if (notFound) {
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
                // Format the name
                req.body.name = req.body.name.toLowerCase();
                req.body.name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
                // Set the URL to be used to parse for images
                if(!req.body.image) {
                    serpOptions.url = 'https://app.zenserp.com/api/v2/search?q=' + newVar + '&apikey=f3b1a770-aec5-11ea-8bc1-3f6cfb6956fc&tbm=isch'
                    request(serpOptions, function(err, response, body) {
                        newObj = JSON.parse(body);
                        imageUrl = newObj.image_results[0].sourceUrl;
                        req.body.image = imageUrl;
                        const drug = new Drug(req.body);
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
            } else {
                res.render('drugs/new', {
                    user: req.user,
                    title: 'Drug.io | Add a Drug',
                    message: 'That is not a drug!'
                })
            }
        })
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
        res.redirect('back');
    }
}

/* Example promise
 * Promises instead of callback functions
 * function index(req, res) {
 *     Drug.find({}).then(drugs => {
 *         User.find({}).then(users => {
 *             res.render('drugs/index', {
 *                 drugs,
 *                 users,
 *                 user: req.user,
 *                 title: 'Drugs List', 
 *             })
 *         }).catch(err => {
 *             res.redirect('error'); 
 *         });
 *     });
 * }
 */ 