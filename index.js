require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

var app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(ejsLayouts);

// Setup flash messages
app.use(flash());

// Attach the current user to the response for all routes
// Also, attach the flash messages
app.use(function (req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/search', (req, res) => {
  res.render('search');
});

app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
