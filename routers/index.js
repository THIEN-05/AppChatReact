const express = require('express');
const accountRouter = require('./account_router');

const router = (app) => {
    app.use('/account', accountRouter);
};

module.exports = router;