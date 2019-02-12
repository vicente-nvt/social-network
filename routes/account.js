var AccountController = require('../controllers/account')

module.exports = (app) => {

    let mongoose = app.get('mongoose')
    let nodemailer = app.get('nodemailer')
    let config = app.get('config')

    this.accountController = new AccountController(config, mongoose, nodemailer)

    app.get('/account/authenticated', (req, res) => {
        this.accountController.isAuthenticated(req, res)
    })

    app.post('/account/register', (req, res) => {
        this.accountController.registerAccount(req, res)
    })

    app.post('/account/forgotPassword', (req, res) => {
        this.accountController.forgotPassword(req, res)
    })

    app.get('/account/resetPassword', (req, res) => {
        this.accountController.renderResetPassword(req, res)
    })

    app.post('/account/resetPassword', (req, res) => {
        this.accountController.setNewPassword(req, res)
    })
}