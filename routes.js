const express = require('express'),
    router = express.Router(),
    v1Routes = require('./routes/v1'),
    v2Routes = require('./routes/v2')

router
    .route('/')
    .get((req, res, next) => {
        return res.status(200).send(`${process.env.WELCOME_TEXT}`)
    });

router.use('/v1', v1Routes)
router.use('/v2', v2Routes)

module.exports = router