require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');

var request = require('request');

var app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(ejsLayouts);

app.get('/', function (req, res) {
  request('https://data.seattle.gov/resource/fxh3-tqdm.json', function(error, response, body) {
    var results = JSON.parse(body);
    console.log(JSON.stringify(results));
    res.render('index', { results: results });
  });
});

app.get('/search', (req, res) => {
  res.render('search');
});



// app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
