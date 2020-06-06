// Load express
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const methodOverride = require('method-override');
const port = 3000;

// Routes
const indexRouter = require('./routes/index');
const drugsRouter = require('./routes/drugs');

// Create our express app
const app = express();

// Connect to DB, and configs
require('./config/database');
require('dotenv').config();
require('./config/passport');

// Setup views
app.set('view engine', 'ejs');

// Mount Middleware
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));


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