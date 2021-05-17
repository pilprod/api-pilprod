const express = require('express');
const routes = require('./routes');
var cors = require('cors');
// const path = require('path'),
// const dotenv = require('dotenv').config();
var app = express()
var host = process.env.HOST
var port = process.env.PORT

// Enable CORS
var allowDomain = ['https://www.pilprod.com', 'https://ww2.technobox67.ru']
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowDomain.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}
app.options('/v2', cors(corsOptionsDelegate)) // enable pre-flight request for DELETE request

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('title', 'API PILPROD')

// app.use(function(req, res, next) {
//     res.setHeader("Access-Control-Allow-Headers", "Accept, Accept-Language, Content-Type, X-Requested-With, Authorization, Origin");
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     next();
// });

app.use('/', routes)

app.use(express.static('public'));

app.listen(port, host, () => console.log(`Приложение запущено. URL: http://${host}:${port}`));