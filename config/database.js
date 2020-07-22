const mongoose = require('mongoose');
let dateOb = new Date();
let date = (dateOb.getMonth() + "-" + dateOb.getDate() + "-" + dateOb.getFullYear() + " at " + dateOb.getHours() + ":" + dateOb.getMinutes());

mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/drugs', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', function() {
    console.log(`Connected to MongoDB at ${db.host}: ${db.port} at ${date}`);
});