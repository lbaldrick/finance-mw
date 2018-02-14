const loginRoute = require('express').Router();
const AuthUtil = require('../../../../utils/AuthUtil');

const HARDCODED_USERNAME = 'username';
const HARDCODED_PASSWORD = 'password';

loginRoute.get('/', (req, res, next) => {
    res.send('login');
});

loginRoute.post('/', (req, res, next) => {
    res.send('login');
    if (req.body.username === HARDCODED_USERNAME && req.body.password === HARDCODED_PASSWORD) {
        res.status(200).send({
                auth: true,
                token: AuthUtil.createToken('1111111', HARDCODED_USERNAME),
                accountDetails: {
                    username: 'username',
                    accountId: '1111111',
                }
            }
        );
    } else {
        res.status(404).send('Account not found');
    }
});


module.exports = loginRoute;
