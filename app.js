var consign = require('consign')
var express = require('express')
var session = require('express-session')
var genuuid = require('uuid/v1')
var app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(session({
    genid: function(req) {
      return genuuid();
    },
    secret: '$0ci4LN3tw0rK'
  }))

consign()
    .include('routes')
    .into(app);

app.listen(8080);