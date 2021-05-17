const express = require('express'),
    router = express.Router(),
    v1Routes = require('./routes/v1')

router
    .route('/')
    .get((req, res, next) => {
        res.setHeader("Access-Control-Allow-Headers", "Accept, Accept-Language, Content-Type, X-Requested-With, Authorization, Origin");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
        res.setHeader("Access-Control-Allow-Credentials", true);
        next();
        return res.status(200).send(`'${process.env.WELCOME_TEXT}'`)
    });

router.use('/v1', v1Routes)

module.exports = router