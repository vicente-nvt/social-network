var IndexController = require('../controllers/index')

module.exports = (app) => {
    app.get('/', (req, res) => {
        IndexController.renderIndex(req, res);
    });
}

