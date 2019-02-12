var consign = require('consign');
var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

consign()
    .include('routes')
    .into(app);

app.get('/account/authenticated', (req, res) => {
    if (req.session.loggedIn)
        res.sendStatus(200)
    else
        res.sendStatus(401)
});

app.post('/register', (req, res) => {
    var firstName = req.param('firstName', '');
    var lastName = req.param('lastName', '');
    var email = req.param('email', null);
    var password = req.param('password', null);

    if (null == email || null == password) {
        res.sendStatus(400);
        return;
    }

    Account.register(email, password, firstName, lastName);
    res.sendStatus(201); 
    return;
});

app.listen(8080);