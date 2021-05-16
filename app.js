const express = require('express');
const routes = require('./routes');
// const path = require('path'),
// const dotenv = require('dotenv').config();
var app = express()
var host = process.env.HOST
var port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('title', 'API PILPROD')

app.use('/', routes)

app.use(express.static('public'));

app.listen(port, host, () => console.log(`Приложение запущено. Адрес: http://${host}:${port}`));