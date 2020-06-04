module.exports = {
    index
};

function index(req, res) {
    res.render('index', {title: 'Drugs Review'});
}