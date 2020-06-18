const Drug = require('../models/drug');
const User = require('../models/user');
const moment = require('moment');
const drug = require('../models/drug');

module.exports = {
    show,
    update
};

async function update(req, res) { // FIXME: Finish
    try {
        const user = await User.findById(req.user.id);
        for (let key in req.body) {
            if (req.body[key]) {
                user[key] = req.body[key];
            }
        }
        user.save(await function(err) {
            if(err) return res.redirect(`/`);
            res.redirect('back');
        });
    } catch (error) {
        console.log(error);
    }
}

async function show(req, res) {
    try {
        const user = await User.findById(req.user.id);
        const drugs = await Drug.find({});
        res.render('users/show', {
            user,
            drugs,
            title: 'Drug.io | ' + user.name,
            moment
        });
    } catch (error) {
        if(error) {
            console.log(error);
            return res.redirect('back');
        }
    }
}