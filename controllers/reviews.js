const Drug = require('../models/drug');
const User = require('../models/user');

module.exports = {
    create
};

function create(req, res) {
    Drug.findById(req.params.id, function(err, drug) {
        //Point to the user who made the review
        drug.reviews.postedBy = req.user._id;
        //Convert liked and side effects checkbox to booleans
        req.body.liked = !!req.body.liked;
        req.body.sideEffect = !!req.body.sideEffect;
        //If it is liked, add it to user's array of liked drugs
        if (req.body.liked) {
            req.user.liked.push(drug.name);
            req.user.save(function(err) {
                //Remove blank fields
                for (let key in req.body) {
                    if (req.body[key] === '') delete req.body[key];
                    }
                drug.reviews.push(req.body);
                if(err) {console.log(err)};
                drug.save(function(err) {
                    console.log(err);
                    if(err) return res.redirect(`/drugs/${drug._id}`);
                    console.log(drug);
                    res.redirect(`/drugs`);
                });
            })
        }
    });
}