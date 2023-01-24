module.exports = app => {
    const auth = require('../controllers/auth.controller.js');

    var router = require('express').Router();

    // authenticate user
    router.post('/', auth.auth);

    app.use('/api/auth', router);
}