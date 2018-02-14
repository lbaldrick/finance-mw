const request = require('request');
const config = require('../config');
const alphaVantageApiKey = config.alphaVantageApiKey;

const getMarketData = (res, period, symbol, physicalCurrency) => {
    let urlBase;
    if (period === 'INTRADAY') {
        urlBase = config.cryptocurrencyIntradayUrl;
    } else if (period === 'DAILY') {
        urlBase = config.cryptocurrencyDailyUrl;
    } else if (period === 'WEEKLY') {
        urlBase = config.cryptocurrencyWeeklyUrl;
    } else if (period === 'MONTHLY') {
        urlBase = config.cryptocurrencyMonthlyUrl;
    } else {
        urlBase = config.cryptocurrencyIntradayUrl;
    }
    const marketDataUrl = `${urlBase}&symbol=${symbol}&market=${physicalCurrency}&apikey=${alphaVantageApiKey}`;
    makeRequest(marketDataUrl, res);
};

const makeRequest = (url, res) => {
    request
        .get(url)
        .on('response', (response) => {
            console.log(response.statusCode);
        })
        .on('data', (data) => {
            res.status(200).send(data);
        })
        .on('error', (error) => {
            console.log('error: ' + error);
        });
};

module.exports.getMarketData =  getMarketData;


