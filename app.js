// Create and update ".env.development.local", ".env.production.local" from template .env
const express = require('express')
const path = require('path')
const nodemailer = require('nodemailer');
// Uncomment if use only .env file
// const dotenv = require('dotenv').config()
const app = express()
const port = process.env.PORT

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASS,
    },
});

// ?
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.json());
app.use(express.static(buildPath));

// Set Header
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Accept,Authorization,Origin");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

// Index
app.get('/', (req, res) => {
    res.send(process.env.WELCOME_TEXT)
})

// PILPROD API Section
app.get('/pilprod', function (req, res) {
    res.send('API для PILPROD');
});

app.get('/pilprod/form', function (req, res) {
    res.send('Для отправки данных нужно сделать POST-запрос на /pilprod/form/send');
});

// TechnoBOX API Section
app.get('/technobox', function (req, res) {
    res.send('API для TechnoBox');
});

app.get('/technobox/form', function (req, res) {
    res.send('Для отправки данных нужно сделать POST-запрос на /technobox/form/send');
});

app.get('/technobox/form/send', function (req, res) {
    res.send('Для отправки данных нужно сделать POST-запрос');
});

app.post('/technobox/form/send', function (req, res) {
    try {

        const {
            name = '',
            phone = '',
            message = ''
        } = req.body

        const mailOptions = {
            from: process.env.MAIL_FROM_NAME + process.env.MAIL_FROM_EMAIL,
            to: process.env.MAIL_TO,
            subject: process.env.MAIL_SUBJECT,
            html: `
            <head>
                <meta charset="utf-8">
            </head>
            <h3>Данные клиента</h3>
            <ul class="list-group">
                <li>Имя: ${name}</li>
                <li>Номер телефона: ${phone}</li>
                <li>Сообщение: ${message}</li>
            </ul>
            `,
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: 'Что-то пошло не так! Повторите попытку позже.'
                });
            } else {
                res.send({
                    success: true,
                    message: 'Спасибо! Скоро мы свяжемся с вами.'
                });
            }
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Что-то пошло не так! Повторите попытку позже.'
        });
    }
});

// Share "/public" folder
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Приложение запущено. Адрес: http://localhost:${port}`)
})