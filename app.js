const express = require('express');
const routes = require('./routes');
var cors = require('cors');
// const path = require('path'),
// const dotenv = require('dotenv').config();
var app = express()
var host = process.env.HOST
var port = process.env.PORT

// Enable CORS
// var allowedOrigins = ['https://www.pilprod.com',
//                       'https://www.technobox67.ru'];

// app.use(cors({origin: function(origin, callback) {
//       // allow requests with no origin 
//       // (like mobile apps or curl requests)
//       if(!origin) return callback(null, true);
//       if(allowedOrigins.indexOf(origin) === -1){
//         var msg = 'The CORS policy for this site does not ' +
//                   'allow access from the specified Origin.';
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     }
// }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('title', 'API PILPROD')

app.use('/', routes)

app.use(express.static('public'));

app.listen(port, host, () => console.log(`Приложение запущено. URL: http://${host}:${port}`));