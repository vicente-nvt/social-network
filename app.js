var consign = require('consign')
var express = require('express')
var bodyParser = require('body-parser')
var cookieSession = require('cookie-session')
var cookieParser = require('cookie-parser')
var app = express();

var nodemailer = require('nodemailer')

var mongoose = require('mongoose')
var config = {
  mail: require('./config/mail')
}
app.set('mongoose', mongoose)
app.set('config', config)
app.set('nodemailer', nodemailer)

app.set('view engine', 'pug')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieSession({ name:'session', keys: ['$0c14LN3tw0rK'], maxAge: 24*60*60*1000 }))

mongoose.connect('mongodb://localhost/nodebackbone')

consign()
  .include('routes')
  .into(app);

app.listen(8080);