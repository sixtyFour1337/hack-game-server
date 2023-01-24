const db = require('../models');
const User = db.users;

exports.auth = (req, res) => {
    // validate request
    if (!req.body.username && !req.body.password) {
        return res.status(400).send({message: 'Content can not be empty!'});
    }

    // only for offline testing purpose
    if (req.body.username === 'test'
        && req.body.password === 'test') {
        res.send(true);
    } else {
        res.status(false);
    }


};