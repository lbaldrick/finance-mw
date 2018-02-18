const express  = require('express');
const v1Route   = new express.Router();
const cryptocurrencies  = require('./cryptocurrencies');
const shares  = require('./shares');

v1Route.use('/cryptocurrencies', cryptocurrencies);
v1Route.use('/shares', shares);

module.exports = v1Route;