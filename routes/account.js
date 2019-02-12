var accountController = require('../controllers/account')

module.exports = (app) => {
    app.get('/account/authenticated', (req, res) => {
        accountController.checkAuthenticated(req, res)
    })

    app.post('/account/register', (req, res) => {
        accountController.registerAccount(req, res)
    })

    app.post('/account/forgotPassword', (req, res) => {
        accountController.forgotPassword(req, res)
    })

    app.get('/account/resetPassword', (req, res) => {
        accountController.renderResetPassword(req, res)
    })

    app.post('/account/resetPassword', (req, res) => {
        accountController.setNewPassword(req, res)
    })
}