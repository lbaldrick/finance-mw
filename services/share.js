const request = require('request');
const config = require('../config');
const alphaVantageApiKey = config.alphaVantageApiKey;
const mock = require('../mocks/mock_timeseries');
const timeseries = require('../dtos/timeseries');

const getMarketData = (res, period, symbol, interval) => {
    let urlBase;
    if (period === 'INTRADAY') {
        urlBase = config.shareIntradayUrl;
    } else if (period === 'DAILY') {
        urlBase = config.shareDailyUrl;
    } else if (period === 'WEEKLY') {
        urlBase = config.shareWeeklyUrl;
    } else if (period === 'MONTHLY') {
        urlBase = config.shareMonthlyUrl;
    } else {
        urlBase = config.shareIntradayUrl;
    }
    const marketDataUrl = `${urlBase}&symbol=${symbol}&interval=${interval}&apikey=${alphaVantageApiKey}`;

    console.log('requesting url: ' + marketDataUrl);
    makeRequest(marketDataUrl, res);
};

const makeRequest = (url, res) => {
    let chunks = [];
    request
        .get(url)
        .on('response', (response) => {
            console.log(response.statusCode);
        }).on('data', function(data) {
            chunks.push(data);
        }).on('end', function() {
            let data   = Buffer.concat(chunks);
            let schema = JSON.parse(data);
            console.log(timeseries.convertAlphaVantageDataToTimeSeriesDto(schema));
            res.status(200).send(timeseries.convertAlphaVantageDataToTimeSeriesDto(schema));
        })
        .on('error', (error) => {
            console.log('error: ' + error);
            res.status(200).send(timeseries.convertAlphaVantageDataToTimeSeriesDto(mock.mock));
        });
};

function replacer(key, value) {
    // Filtering out properties
    if (value.startsWith('00"')) {
        console.log('key: ' + key);
        console.log('value: ' + value);
    }
    return value;
}

module.exports.getMarketData =  getMarketData;


