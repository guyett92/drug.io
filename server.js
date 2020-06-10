// Load express and middleware
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const methodOverride = require('method-override');  
const favicon = require('serve-favicon');

const port = process.env.PORT || 3000;

// Routes
const indexRouter = require('./routes/index');
const drugsRouter = require('./routes/drugs');

// Create our express app
const app = express();

// Connect to DB, and configs
require('dotenv').config(); // Has to be before database config
require('./config/database');
require('./config/passport');

// Setup views
app.set('view engine', 'ejs');

// Mount middleware
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'public/img', 'pills.ico')));


// Session middleware
const session = require('express-session');
app.use(session({
  secret: 'DRUGS',
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

// Mount Routes
app.use('/', indexRouter);
app.use('/drugs', drugsRouter);

// Listening...
app.listen(port, function () {
  console.log(`MongoDB is listening on: ${port}`);
});