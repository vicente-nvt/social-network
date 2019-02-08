var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render("index.jade", { layout: false });
});

app.listen(8080);