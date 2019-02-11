var http = require('http');
var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
var appRoutes = require('./routes/appRoutes');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var assert = require('assert');
var Sandbox = require('./node_modules/sandbox/lib/sandbox');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var cors = require('cors');




app.options('*', cors());
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect('mongodb://userRoot:root123@ds143778.mlab.com:43778/treinodb');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.get("Origin")||"*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Content-Length, X-Custom-Header,Accept");
  next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'woot',
  resave: false, 
  saveUninitialized: false}));


app.use(flash());

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/server', appRoutes);
app.use('/', express.static('static'));
  var s = new Sandbox();
  var b = s.run( "1 + 1", function( output ) {
  })





var server = app.listen(port, function() {
  console.log(new Date().toISOString() + ": server started on port "+ port);
});

