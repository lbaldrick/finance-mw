const express  = require('express');
const v1Route   = new express.Router();
const cryptocurrencies  = require('./cryptocurrencies');

v1Route.use('/cryptocurrencies', cryptocurrencies);

module.exports = v1Route;