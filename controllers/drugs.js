const Drug = require('../models/drug');

module.exports = {
    index
};

function index(req, res) {
    Drug.find({}, function(err, drugs) {
        res.render('drugs/index', {title: 'Drugs List', drugs});
    });
}