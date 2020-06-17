const Drug = require('../models/drug');
const User = require('../models/user');
const moment = require('moment');

module.exports = {
    show
};

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
        console.log(req.user);
    } catch (error) {
        if(error) {
            console.log(error);
            return res.redirect('back');
        }
    }
}