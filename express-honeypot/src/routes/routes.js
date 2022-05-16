
const GetInfos = require('../controllers/getInfos')

module.exports = function (app){
    app.get('/*', (req, res) => {
        GetInfos.getInfos(req, res)

    });
}