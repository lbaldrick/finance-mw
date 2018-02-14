const accountRoute = require('express').Router();

accountRoute.get('/', (req, res, next) => {
    res.send('account');
});


module.exports = accountRoute;