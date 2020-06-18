const User = require('../models/user');
const nodemailer = require('nodemailer');
const GMAIL_USER = process.env.GMAIL_USER
const GMAIL_PASS = process.env.GMAIL_PASS


module.exports = {
    index,
    about,
    contact,
    report,
    submitReport,
    submitContact
};

async function submitContact(req, res) {
    try {
        let transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
              user: 'inquiryatag@gmail.com',
              pass: 'dotenvdoesntwork'
            }
          });

        const mailOpts = await {
            from: '', // Gmail ignores this
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
        let transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
              user: 'inquiryatag@gmail.com',
              pass: 'dotenvdoesntwork'
            }
          });

        const mailOpts = await {
            from: '', // Gmail ignores this
            to: 'aaronguyett@yahoo.com',
            subject: req.body.category + ': Issue from drugs.io',
            text: `${req.body.name} (${req.body.email}) says ${req.body.message}`,
            // attachments: [
            //     {
            //         filename: req.body.image,
            //         content: new Buffer.from(req.body.image.split("base64,")[1], "base64") //FIXME: Add upload image
            //     }
            // ]
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

async function report(req, res) {
    try {
        const users = User.find({});
        res.render(await 'report', {
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
        res.render(await 'contact', {
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
        res.render(await 'about', {
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