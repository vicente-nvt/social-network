var Account = require('../models/account');

var login = (req, res) => {
    var email = req.params.email;
    var password = req.params.password;

    if (null == email || email.length < 1 || null == password || password.length < 1) {
        res.sendStatus(400)
        return
    }

    Account.login(email, password, (success) => {
        if (!success) {
            res.sendStatus(401)
            return
        }
        res.sendStatus(200)
    })
}

module.exports = {
    login: login
}