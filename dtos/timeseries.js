const INFO_FIELD = '1. Information';
const SYMBOL_FIELD = '2. Symbol';
const LAST_REFRESHED_FIELD = '3. Last Refreshed';
const INTERVAL_FIELD = '4. Interval';
const TIMEZONE_FIELD = '6. Time Zone';
const IIME_SERIES_1MIN_FIELD = 'Time Series (1min)';
const META_DATA_FIELD = 'Meta Data';
const OPEN_FIELD = '1. open';
const HIGH_FIELD = '2. high';
const LOW_FIELD = '3. low';
const CLOSE_FIELD = '4. close';
const VOLUME_FIELD = '5. Svolume';

class TimeSeriesData {
    constructor(timestamp, open, high, low, close, volume) {
        this.timestamp = timestamp;
        this.open = open;
        this.high = high;
        this.low = low;
        this.close = close;
        this.volume = volume;
    }
}

class TimeSeriesDataMeta {
    constructor(title, symbol, lastRefreshedTimestamp, interval, timeZone) {
        this.title = title;
        this.symbol = symbol;
        this.lastRefreshedTimestamp = lastRefreshedTimestamp;
        this.interval = interval;
        this.timeZone = timeZone;
    }
}

class TimeSeriesDto {
    constructor(timeSeriesDataMeta, timeSeriesDataList) {
        this.timeSeriesDataMeta = timeSeriesDataMeta;
        this.timeSeriesDataList = timeSeriesDataList;
    }
}

const convertAlphaVantageDataToTimeSeriesDto = (alphaVantageData) => {
    if (alphaVantageData) {
        let alphaMeta = alphaVantageData[META_DATA_FIELD];
        console.log(alphaVantageData);
        let timeSeriesDataMeta = new TimeSeriesDataMeta(
            alphaMeta[INFO_FIELD],
            alphaMeta[SYMBOL_FIELD],
            alphaMeta[LAST_REFRESHED_FIELD],
            alphaMeta[INTERVAL_FIELD],
            alphaMeta[TIMEZONE_FIELD]);
        let alphaTimeSeries = alphaVantageData[IIME_SERIES_1MIN_FIELD];
        let alphaTimeSeriesKeys  = Object.keys(alphaTimeSeries);
        let timeSeriesDataList = alphaTimeSeriesKeys.map((timestamp) => {
            let seriesData = alphaTimeSeries[timestamp];
            return new TimeSeriesData(
                timestamp,
                seriesData[OPEN_FIELD],
                seriesData[HIGH_FIELD],
                seriesData[LOW_FIELD],
                seriesData[CLOSE_FIELD],
                seriesData[VOLUME_FIELD]);
        });
        return new TimeSeriesDto(timeSeriesDataMeta, timeSeriesDataList);
    }

    return null;

};

module.exports = {
    convertAlphaVantageDataToTimeSeriesDto,
};