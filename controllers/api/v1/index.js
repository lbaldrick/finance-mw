const express = require('express');
const v1Route = new express.Router();
const login = require('./login');
const marketData  = require('./market-data');

v1Route.use('/login', login);
v1Route.use('/market-data', marketData);

module.exports = v1Route;
