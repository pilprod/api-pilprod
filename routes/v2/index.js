const express = require('express'),
    cors = require('cors'),
    router = express.Router(),
    formsRoutes = require('./forms.routes')
    

router
    .route('/')
    .get((req, res) => {
        var apiVersion = 'v2'
        return res.status(200).send(`This is PILPROD API-service ${apiVersion}`)
    });

// Enable CORS
var allowedOrigins = ['https://www.pilprod.com',
                      'https://www.technobox67.ru'];

router.use(cors({origin: function(origin, callback) {
      // allow requests with no origin 
      // (like mobile apps or curl requests)
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
}))

router.use('/form', formsRoutes)

module.exports = router