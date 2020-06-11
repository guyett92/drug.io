const Drug = require('../models/drug');
const User = require('../models/user');

module.exports = {
    create
};

async function create(req, res) {
    try {
        const drug = await Drug.findById(req.params.id);
        //Point to the user who made the review
        drug.reviews.postedBy = req.user._id;
        //Convert liked and side effects checkbox to booleans
        req.body.liked = !!req.body.liked;
        req.body.sideEffect = !!req.body.sideEffect;
        if (req.body.liked) {
            //Check to see if the user has favorited the drug already
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
        if(err) {console.log(err)};
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

// function create(req, res) {
//     Drug.findById(req.params.id, function(err, drug) {
//         //Point to the user who made the review
//         drug.reviews.postedBy = req.user._id;
//         //Convert liked and side effects checkbox to booleans
//         req.body.liked = !!req.body.liked;
//         req.body.sideEffect = !!req.body.sideEffect;
//         //If it is liked, add it to user's array of liked drugs
//         if (req.body.liked) {
//             req.user.liked.push(drug.name);
//             req.user.save(function(err) {
//                 //Remove blank fields
//                 for (let key in req.body) {
//                     if (req.body[key] === '') delete req.body[key];
//                     }
//                 drug.reviews.push(req.body);
//                 if(err) {console.log(err)};
//                 drug.save(function(err) {
//                     if(err) return res.redirect(`/drugs/${drug._id}`);
//                     console.log(drug);
//                     res.redirect(`/drugs`);
//                 });
//             })
//         }
//     });
// }