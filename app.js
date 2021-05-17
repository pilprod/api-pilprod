const express = require('express');
const routes = require('./routes');
// const path = require('path'),
// const dotenv = require('dotenv').config();
var app = express()
var host = process.env.HOST
var port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.set('title', 'API PILPROD')
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Headers", "Accept, Accept-Language, Content-Type, X-Requested-With, Authorization, Origin");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use('/', routes)

app.use(express.static('public'));

app.listen(port, host, () => console.log(`Приложение запущено. Адрес: http://${host}:${port}`));