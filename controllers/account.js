var Account = require('../models/account');

class AccountController {

    constructor(config, mongoose, nodemailer) {
        this.Account = new Account(config, mongoose, nodemailer);
    }

    isAuthenticated(req, res) {
        console.log(req.session)
        if (req.session.loggedIn)
            res.sendStatus(200)
        else
            res.sendStatus(401)
    }

    registerAccount(req, res) {
        var firstName = req.body.firstName
        var lastName = req.body.lastName
        var email = req.body.email
        var password = req.body.password

        console.log(req.body)

        if (null == email || null == password) {
            res.sendStatus(400);
            return;
        }

        this.Account.register(email, password, firstName, lastName);
        res.sendStatus(201);
        return;
    }

    forgotPassword(req, res) {
        var hostname = req.headers.host
        var resetPasswordUrl = "http://" + hostname + '/account/resetPassword'
        var email = req.params.email
        if (null == email || email.length < 1) {
            res.sendStatus(400)
            return
        }
        this.Account.forgotPassword(email, resetPasswordUrl, (success) => {
            if (success)
                res.sendStatus(200)
            else
                res.sendStatus(404)
        })
    }

    renderResetPassword(req, res) {
        var accountId = req.params.account
        res.render('resetPassword.pug', { locals: { accountId: accountId } })
    }

    setNewPassword(req, res) {
        var accountId = req.params.accountId
        var password = req.param.password
        if (null != accountId && null != password)
            this.Account.changePassword(accountId, password)
        res.render('resetPasswordSuccess.pug')
    }

}

module.exports = AccountController;