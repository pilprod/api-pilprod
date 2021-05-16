const express = require('express'),
    router = express.Router(),
    v1Routes = require('./routes/v1')

router
    .route('/')
    .get((req, res) => {
        var answer = '/'
        return res.json({ message: answer })
    });

router.use('/v1', v1Routes)

module.exports = router