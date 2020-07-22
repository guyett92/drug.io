const User = require('../models/user');
const Drug = require('../models/drug');
const nodemailer = require('nodemailer');
const GMAIL_USER = process.env.GMAIL_USER
const GMAIL_PASS = process.env.GMAIL_PASS


module.exports = {
    index,
    about,
    contact,
    report,
    submitReport,
    submitContact,
    search,
    code
};

async function code(req, res) {
    try {
        const users = await User.find({});
        res.render('code', {
            users,
            user: req.user,
            title: 'Drug.io | Code of Ethics'}
        );
    } catch(error) {
        console.log(error);
        res.redirect('back');
    }
}

async function search(req, res) {
    try {
        req.body.term = await req.body.term.toLowerCase();
        req.body.term = await req.body.term.charAt(0).toUpperCase() + req.body.term.slice(1);
        const drug = await Drug.findOne({'name': req.body.term});
        if (drug) {
            res.redirect(`/drugs/${drug._id}`)
        } else {
            res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        res.redirect('back');
    }
}

async function submitContact(req, res) {
    try {
        let transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
              user: 'inquiryatag@gmail.com',
              pass: 'dotenvdoesntwork'
            }
          });

        const mailOpts = {
            from: '',
            to: 'aaronguyett@yahoo.com',
            subject: req.body.subject + ' from Drugs.io',
            text: `${req.body.name} (${req.body.email}) says ${req.body.message}`
        }

        transport.sendMail(mailOpts, (error, response) => {
            console.log('done')
            if(error) {
                res.redirect('back') //FIXME: Contact-failure
            } else {
                res.redirect('/') //FIXME:Contact-success
            }
        })
    } catch(error) {
        console.log(error)
        res.redirect('back')
    }
}

async function submitReport(req, res) {
    try {
        console.log(req.body);
        let transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
              user: 'inquiryatag@gmail.com',
              pass: 'dotenvdoesntwork'
            }
          });

        const mailOpts = {
            from: '',
            to: 'aaronguyett@yahoo.com',
            subject: req.body.category + ': Issue from drugs.io',
            text: `${req.body.name} (${req.body.email}) says ${req.body.message}`,
        }


        transport.sendMail(mailOpts, (error, response) => {
            if(error) {
                res.redirect('back') //FIXME: Contact-failure
            } else {
                res.redirect('/') //FIXME:Contact-success
            }
        })
    } catch(error) {
        console.log(error)
        res.redirect('back')
    }
}

async function report(req, res) {
    try {
        const users = User.find({});
        res.render('report', {
            users,
            user: req.user,
            title: 'Drug.io | Report'}
        );
    } catch(error) {
        console.log(error);
        res.redirect('/error');
    }
}

async function contact(req, res) {
    try {
        const users = User.find({});
        res.render('contact', {
            users,
            user: req.user,
            title: 'Drug.io | Contact'}
        );
    } catch(error) {
        console.log(error);
        res.redirect('/error');
    }
}

async function about(req, res) {
    try {
        const users = User.find({});
        res.render('about', {
            users,
            user: req.user,
            title: 'Drug.io | About'}
        );
    } catch(error) {
        console.log(error);
        res.redirect('/error');
    }
}

function index(req, res) {
    User.find({}, function(err, users) {
        res.render('index', {
            users,
            user: req.user,
            title: 'Drug.io | Home'}
        );
    });
}