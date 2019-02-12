var indexController = require('../controllers/index')

module.exports = (app) => {
    app.get('/', (req, res) => {
        indexController.renderIndex(req, res);
    });
}

