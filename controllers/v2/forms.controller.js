// const express = require('express');
const nodemailer = require('nodemailer');

class FormsController {
    getForms(req, res) {
        if (req.query.send === 'mail') {
            return res.json({
                POST: {
                    contacts: {
                        name: 'string',
                        phone: 'string'
                    },
                    message: 'string'
                }
            })
        } else {
            var answer = "Example: GET /form?send=mail"
            return res.json({ message: answer })
        }
    };
    async sendForms(req, res) {
        if (req.query.send === 'mail') {
            var fromEmail = process.env.MAIL_FROM_NAME + process.env.MAIL_FROM_EMAIL
            var transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                secure: process.env.MAIL_SECURE,
                auth: {
                    user: process.env.MAIL_AUTH_USER,
                    pass: process.env.MAIL_AUTH_PASS,
                },
            });            
            var origin = req.headers['origin']
            var userAgent = req.headers['user-agent']

            var { name = '', phone = '' } = req.body.contacts
            var { message = '' } = req.body

            var date = new Date()
            const dateOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                // weekday: 'long' // День недели
            };

            if (origin === 'https://ww2.pilprod.com') {
                var originDomain = origin.replace('https://', '')
                var toEmail = 'pilprod@yandex.ru'
                var fromSubject = 'Заявка от ' + originDomain
                var currentDate = date.toLocaleDateString('ru-RU', dateOptions)
                var currentTime = date.toLocaleTimeString('ru-RU')
            } else if (origin === 'https://www.pilprod.com') {
                var originDomain = origin.replace('https://', '')
                var toEmail = 'contact@pilprod.com'
                var fromSubject = 'Заявка от ' + originDomain
                var currentDate = date.toLocaleDateString('ru-RU', dateOptions)
                var currentTime = date.toLocaleTimeString('ru-RU')
            } else if (origin === 'https://www.technobox67.ru') {
                var originDomain = origin.replace('https://', '')
                var toEmail = 'technobox67@yandex.ru'
                var fromSubject = 'Заявка от ' + originDomain
                var currentDate = date.toLocaleDateString('ru-RU', dateOptions)
                var currentTime = date.toLocaleTimeString('ru-RU')
            } else {
                var toEmail = 'pilprod@yandex.ru'
                var fromSubject = 'Тестовая заявка'
                var currentDate = date.toLocaleDateString('ru-RU', dateOptions)
                var currentTime = date.toLocaleTimeString('ru-RU')
            }

            const mailOptions = {
                from: fromEmail,
                to: toEmail,
                subject: fromSubject,
                html: `
                        <head>
                            <meta charset="utf-8">
                        </head>
                        <h1>Данные клиента</h1>
                        <ul class="list-group">
                            <li>Имя: ${name}</li>
                            <li>Номер телефона: ${phone}</li>
                            <p>Сообщение: ${message}</p>
                        </ul>
                        <h2>Доп.информация:</h2>
                        <p>Дата отправки: ${currentDate} ${currentTime}<br>Отправлено с:</p>
                        <p sryle="font-size: 50%;">${userAgent}</p>
                        `,
            };
            try {
                transporter.sendMail(mailOptions, function(err, info) {
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
        } else {
            return res
                .status(400)
                .send({ message: 'Error 400. Bad request.' })
        }
    };
}

module.exports = new FormsController()