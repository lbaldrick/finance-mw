const cryptocurrenciesRoute = require('express').Router();
const supportedCryptos = require('../../../../../resources/cryptocurrencies');
const supportedPhysicalCurrencies = require('../../../../../resources/cryptocurrencies');

cryptocurrenciesRoute.get('/', (req, res, next) => {
    res.send('cryptocurrencies');
});

cryptocurrenciesRoute.get('/supported', (req, res, next) => {
    res.send({
        supportedCryptos: supportedCryptos,
        supportedPhysicalCurrencies: supportedPhysicalCurrencies,
    });
});


module.exports = cryptocurrenciesRoute;