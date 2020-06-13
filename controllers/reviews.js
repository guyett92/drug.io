const Drug = require('../models/drug');
const User = require('../models/user');

module.exports = {
    create,
    delReview,
    addLike,
    removeLike
};

async function removeLike(req, res) {
    const drug = await Drug.findOne({'reviews._id': req.params.id});
    const reviewSubdoc = await drug.reviews.id(req.params.id);
    for(let i = 0; i < reviewSubdoc.likes.length; i++) {
        if(reviewSubdoc.likes[i].equals(req.user._id)) {
            reviewSubdoc.likes.splice(i, 1);
        }
    }
    drug.save(function(err) {
        if(err) console.log(err);
        res.redirect(`/drugs/${drug._id}`);
    })
}

async function addLike(req, res) {
    const drug = await Drug.findOne({'reviews._id': req.params.id});
    const reviewSubdoc = await drug.reviews.id(req.params.id);
    let alreadyLiked = false;
    if(reviewSubdoc.likes) {
        for(let i = 0; i < reviewSubdoc.likes.length; i++) {
            if(reviewSubdoc.likes[i].name.equals(req.user._id)) {
                alreadyLiked = true;
            }
        }
            if(alreadyLiked) {
                return res.redirect(`/drugs/${drug._id}`);
            }
        }
        reviewSubdoc.likes.push(req.user._id);
        drug.save(function(err) {
            if(err) console.log(error);
            res.redirect(`/drugs/${drug._id}`);
    })
}

async function delReview(req, res) {
    try {
        const drug =  await Drug.findOne({'reviews._id': req.params.id});
        const reviewSubdoc = await drug.reviews.id(req.params.id);
        if (!reviewSubdoc.postedBy.equals(req.user._id)) return res.redirect(`/drugs/${drug._id}`);
        reviewSubdoc.remove();
        drug.save(function(err) {
            res.redirect('back')
        })
    } catch (error) {
        console.log(error)
        res.redirect('back')
    }
}

async function create(req, res) {
    try {
        const drug = await Drug.findById(req.params.id);
        // Point to the user who made the review
        req.body.postedBy = req.user._id; 
        // Convert  side effects checkbox to boolean
        req.body.sideEffect = !!req.body.sideEffect;
        req.user.save(function(err) {
                    console.log(err);
        })
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