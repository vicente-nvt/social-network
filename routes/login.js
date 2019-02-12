var loginController = require('../controllers/login');

module.exports = (app) => {    
    app.post('/login', (req, res) => {
        console.log("hit login");
        loginController.login(req, res);
    });
}