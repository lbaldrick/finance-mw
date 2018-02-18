const sharesRoute = require('express').Router();
const supportedShares = require('../../../../../resources/shares');
const ShareService = require('../../../../../services/share');

sharesRoute.get('/', (req, res, next) => {
    res.send('shares');
});

sharesRoute.get('/supported', (req, res, next) => {
    res.send({
        supportedShares: supportedShares,
    });
});

sharesRoute.post('/', (req, res, next) => {
    const { symbol, period, interval, } = req.body;
    ShareService.getMarketData(res, period, symbol, interval);
});


module.exports = sharesRoute;