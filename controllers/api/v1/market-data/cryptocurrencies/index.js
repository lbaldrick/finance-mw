const cryptocurrenciesRoute = require('express').Router();
const supportedCryptos = require('../../../../../resources/cryptocurrencies');
const supportedPhysicalCurrencies = require('../../../../../resources/cryptocurrencies');
const CryptocurrencyService = require('../../../../../services/cryptocurrency');

cryptocurrenciesRoute.get('/', (req, res, next) => {
    res.send('cryptocurrencies');
});

cryptocurrenciesRoute.get('/supported', (req, res, next) => {
    res.send({
        supportedCryptos: supportedCryptos,
        supportedPhysicalCurrencies: supportedPhysicalCurrencies,
    });
});

cryptocurrenciesRoute.post('/', (req, res, next) => {
    const { symbol, period, physicalCurrency, } = req.body;
    CryptocurrencyService.getMarketData(res, period, symbol, physicalCurrency);
});


module.exports = cryptocurrenciesRoute;