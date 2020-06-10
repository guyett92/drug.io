const Drug = require('../models/drug');
const User = require('../models/user');

module.exports = {
    create
};

//FIXME: Point to a user correctly and make sure it is saving data correctly
function create(req, res) {
    User.find({}, function(err, users) {
        Drug.findById(req.params.id, function(err, drug) {
            //Point to the user who made the review -- MIGHT BE WRONG
            drug.reviews.postedBy = req.user;
            //Convert liked 'checkbox' to a boolean
            req.body.liked = !!req.body.liked;
            //If it is liked, add it to user's array of liked drugs
            if (req.body.liked) {
                user.liked.push(drug.name);
            }
            req.body.liked = '';
            //Remove blank fields
            for (let key in req.body) {
                if (req.body[key] === '') delete req.body[key];
              }
            drug.reviews.push(req.body);
            drug.save(function(err) {
                console.log(err);
                console.log(user);
                if(err) return res.redirect(`/drugs/${drug._id}`);
                console.log(drug);
                res.redirect(`/drugs`);
            });
        });
    });
}