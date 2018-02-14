
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcryptjs');

const encrypt = (stringToEncrypt) => {
    return bcrypt.hashSync(stringToEncrypt, 8);
};

const compare = (unencrypted, encrypted) => {
    return bcrypt.compareSync(unencrypted, encrypted);
};


const createToken = (id, username) => {
    return jwt.sign({ id, username }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
    });
};

const verifyToken = (token, callback) => {
    jwt.verify(token, config.secret, callback);
};

module.exports.createToken =  createToken;
module.exports.verifyToken =  verifyToken;
module.exports.encrypt = encrypt;
module.exports.compare = compare;
