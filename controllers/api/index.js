const express     = require('express');  
const apiRoute    = new express.Router();
const v1Router    = require('./v1');

apiRoute.use('/v1', v1Router);

module.exports = apiRoute;
