var Account = require('../models/account');

var isAuthenticated = (req, res) => {
    if (req.session.loggedIn)
        res.sendStatus(200)
    else
        res.sendStatus(401)
}

var registerAccount = (req, res) => {
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
}

var forgotPassword = (req, res) => {
    var hostname = req.headers.host
    var resetPasswordUrl = "http://" + hostname + '/account/resetPassword'
    var email = req.param('email', '')
    if (null == email || email.length < 1) {
        res.sendStatus(400)
        return
    }

    Account.forgotPassword(email, resetPasswordUrl, (success) => {
        if (success)
            res.sendStatus(200)
        else
            res.sendStatus(404)
    })
}

var renderResetPassword = (req, res) => {
    var accountId = req.param('account', null)
    res.render('resetPassword.pug', { locals: { accountId: accountId } })
}

var setNewPassword = (req, res) => {
    var accountId = req.param('accountId', null)
    var password = req.param('password', null)
    if (null != accountId && null != password)
        Account.changePassword(accountId, password)
    res.render('resetPasswordSuccess.pug')
}

module.exports = {
    checkAuthenticated: isAuthenticated,
    registerAccount: registerAccount,
    forgotPassword: forgotPassword,
    renderResetPassword: renderResetPassword,
    setNewPassword: setNewPassword
}