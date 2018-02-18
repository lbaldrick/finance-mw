const express = require('express');
const app = express();
const apiRouter = require('./controllers/api');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const AuthUtil =  require('./utils/AuthUtil');
//mongoose.connect('mongodb://localhost/buysell', { useMongoClient: true });


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', apiRouter);

app.use('/api/v1/login', (req, res, next) => {
    //authorise(req, res, next);
    next();
});



app.listen(3001, () => {
    console.log('App listening on port 3000');
});


const authorise = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        res.status(401).send({ auth: false, message: 'No token provided.' });
    }

    AuthUtil.verifyToken(token, (err, decoded) => {
        if (err) {
            console.log('decoded username ' + decoded);
        } else {
            console.log(err);
            res.status(401).send({ auth: false, message: 'Unauthorised' });
        }

    });

    next();
};
