const Drug = require('../models/drug');
const User = require('../models/user');

module.exports = {
    create
};

//FIXME: Point to a user correctly and make sure it is saving data correctly
function create(req, res) {
    User.find({}, function(err, users) {
        Drug.findById(req.params.id, function(err, drug) {
            //Point to the user who made the review
            // drug.reviews.postedBy = req.user;
            //Convert liked and side effects checkbox to booleans
            req.body.liked = !!req.body.liked;
            req.body.sideEffect = !!req.body.sideEffect;
            //If it is liked, add it to user's array of liked drugs
            // if (req.body.liked) {
            //     user.liked.push(drug.name);
            // }
            //Remove blank fields
            for (let key in req.body) {
                if (req.body[key] === '') delete req.body[key];
              }
            drug.reviews.push(req.body);
            if(err) {console.log(err)};
            drug.save(function(err) {
                console.log(err);
                // console.log(user);
                if(err) return res.redirect(`/drugs/${drug._id}`);
                console.log(drug);
                res.redirect(`/drugs`);
            });
        });
    });
}