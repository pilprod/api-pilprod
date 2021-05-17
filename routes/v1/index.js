const express = require('express'),
    router = express.Router(),
    formsRoutes = require('./forms.routes')

router
    .route('/')
    .get((req, res) => {
        var apiVersion = 'v1'
        return res.status(200).send(`This is PILPROD API-service ${apiVersion}`)
    });


router.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Headers", "Accept, Accept-Language, Content-Type, X-Requested-With, Authorization, Origin");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

router.use('/form', formsRoutes)

module.exports = router