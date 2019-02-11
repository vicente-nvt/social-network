var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render("index.jade", { layout: false });
});

app.get('/account/authenticated', (req, res) => {
    if (req.session.loggedIn)
        res.sendStatus(200)
    else
        res.sendStatus(401)
});

app.listen(8080);