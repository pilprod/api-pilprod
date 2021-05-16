const express = require('express'),
    router = express.Router(),
    formsRoutes = require('./forms.routes')

router
    .route('/')
    .get((req, res) => {
        var answer = '/v1'
        return res.json({ message: answer })
    });

router.use('/form', formsRoutes)

module.exports = router