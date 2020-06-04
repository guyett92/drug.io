// Load express
const express = require('express');
const morgan = require('morgan');
const port = 3000;

const indexRouter = require('./routes/index');
const drugsRouter = require('./routes/drugs');

// Create our express app
const app = express();

// Connect to DB
require('./config/database');

// Setup views
app.set('view engine', 'ejs');

// Mount Middleware
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// Mount Routes
app.use('/', indexRouter);
app.use('/drugs', drugsRouter);

// Listening...
app.listen(port, function () {
  console.log(`MongoDB is listening on: ${port}`);
});