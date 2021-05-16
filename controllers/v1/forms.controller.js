const express = require('express');
const nodemailer = require('nodemailer');

class FormsController {
    getForms(req, res) {
        if (req.query.send) {
            var send = req.query.send

            const date = new Date()
            const dateOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                // weekday: 'long' // День недели
            };
            if (send === 'www.pilprod.com') {
                var toEmail = 'contact@pilprod.com'
                var subject = 'Заявка от '
                var newDate = date.toLocaleDateString('ru-RU', dateOptions)
                var newTime = date.toLocaleTimeString('ru-RU')
            } else if (send === 'www.technobox67.ru') {
                var toEmail = 'technobox67@yandex.ru'
                var subject = 'Заявка от '
                var newDate = date.toLocaleDateString('ru-RU', dateOptions)
                var newTime = date.toLocaleTimeString('ru-RU')
            } else {
                return res
                    .status(400)
                    .send({ message: 'Bad request. Check value of "send"' })
            }
            var answer = 'Use POST!'
            return res.json({
                // message: answer,
                email: toEmail,
                subject: subject,
                date: newDate,
                time: newTime
            })
        } else {
            var answer = 'Forms Works!!!'
            return res.json({ message: answer })
        }
    };
    async sendForms(req, res) {
        var send = req.query.send
        if (req.query.send) {
            var transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                secure: process.env.MAIL_SECURE,
                auth: {
                    user: process.env.MAIL_AUTH_USER,
                    pass: process.env.MAIL_AUTH_PASS,
                },
            });

            var { name = '', phone = '' } = req.body.contacts
            var { message = '' } = req.body

            var date = new Date()
            const dateOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                // weekday: 'long' // День недели
            };

            var fromEmail = process.env.MAIL_FROM_NAME + process.env.MAIL_FROM_EMAIL
            if (send === 'ww2.pilprod.com') {
                var toEmail = 'pilprod@yandex.ru'
                var fromSubject = 'Заявка от ' + send
                var currentDate = date.toLocaleDateString('ru-RU', dateOptions)
                var currentTime = date.toLocaleTimeString('ru-RU')
            } else if (send === 'www.pilprod.com') {
                var toEmail = 'contact@pilprod.com'
                var fromSubject = 'Заявка от ' + send
                var currentDate = date.toLocaleDateString('ru-RU', dateOptions)
                var currentTime = date.toLocaleTimeString('ru-RU')
            } else if (send === 'www.technobox67.ru') {
                var toEmail = 'technobox67@yandex.ru'
                var fromSubject = 'Заявка от ' + send
                var currentDate = date.toLocaleDateString('ru-RU', dateOptions)
                var currentTime = date.toLocaleTimeString('ru-RU')
            } else {
                return res
                    .status(400)
                    .send({ message: 'Bad request. Check value of "send"' })
            }

            const mailOptions = {
                from: fromEmail,
                to: toEmail,
                subject: fromSubject,
                html: `
                        <head>
                            <meta charset="utf-8">
                        </head>
                        <h2>Данные клиента</h2>
                        <ul class="list-group">
                            <li>Имя: ${name}</li>
                            <li>Номер телефона: ${phone}</li>
                        </ul>
                        <h3>Информация:</h3>
                        <ul class="list-group">
                            <li>Сообщение: ${message}</li>
                        </ul>
                        <h4>Доп.информация:</h4>
                        <ul class="list-group">
                            <li>Дата: ${currentDate}</li>
                            <li>Время: ${currentTime}</li>
                        </ul>
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
                .send({ message: 'Bad request.' })
        }
    };
}

module.exports = new FormsController()