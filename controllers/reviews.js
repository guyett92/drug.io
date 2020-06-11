const Drug = require('../models/drug');
const User = require('../models/user');

module.exports = {
    create,
    delReview
};

async function delReview(req, res) {
    req.drug.reviews.splice(req.params.id, 1);
    req.drug.save(function(err) {
        res.redirect('/drugs')
    })
}

async function create(req, res) {
    try {
        const drug = await Drug.findById(req.params.id);
        // Point to the user who made the review
        drug.reviews.postedBy = await req.user._id; //-- UNCOMMENT FOR USER INTERACTION
        // Convert liked and side effects checkbox to booleans
        req.body.liked = !!req.body.liked;
        req.body.sideEffect = !!req.body.sideEffect;
        if (req.body.liked) { //-- UNCOMMENT FOR USER INTERACTION
            let checkDrug = false;
            for (let i = 0; i < req.user.liked.length; i++) {
                if (req.user.liked[i].toLowerCase() === drug.name ) {
                    checkDrug = true;
                }
            }
            if (checkDrug === false) {
                req.user.liked.push(drug.name);
                req.user.save(function(err) {
                    console.log(err);
                })
            }
        }
        //Remove blank fields
        for (let key in req.body) {
            if (req.body[key] === '') delete req.body[key];
            }
        drug.reviews.push(req.body);
        drug.save(function(err) {
            if(err) return res.redirect(`/drugs`);
        })
        console.log(drug);
        res.redirect(`/drugs/${drug._id}`);
    } catch (error) {
        console.log(error);
        res.redirect('/drugs');
    }
}