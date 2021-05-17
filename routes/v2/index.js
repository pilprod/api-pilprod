const express = require('express'),
    router = express.Router(),
    formsRoutes = require('./forms.routes')

router
    .route('/')
    .get((req, res) => {
        var apiVersion = 'v2'
        return res.status(200).send(`This is PILPROD API-service ${apiVersion}`)
    });

router.use('/form', formsRoutes)

module.exports = router