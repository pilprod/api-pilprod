// Index

// app.get('/form', (req, res, next) => {
//     res.send('Для отправки данных нужно сделать POST-запрос на /form/send')
//     res.json({ message: 'Для отправки данных нужно сделать POST-запрос на /form/send' })
//     console.info("GET /form")
// });

// app.get('/form/send', (req, res, next) => {
//     res.send('Для отправки данных нужно сделать POST-запрос');
// });

// Build path
// const buildPath = path.join(__dirname, '..', 'build');

// var transporter = nodemailer.createTransport({
//     host: process.env.MAIL_HOST,
//     port: process.env.MAIL_PORT,
//     secure: process.env.MAIL_SECURE,
//     auth: {
//         user: process.env.MAIL_AUTH_USER,
//         pass: process.env.MAIL_AUTH_PASS,
//     },
// });

// var allowDomains = ['/pilprod\.com$/', '/technobox67\.ru$/', '/localhost\$/']

// var corsOptionsProvider = (req, callback) => {
//     var corsOptions;
//     if (allowDomains.indexOf(req.header('Origin')) !== -1) {
//         corsOptions = { origin: true }
//     } else {
//         corsOptions = { origin: false }
//     }
//     callback(null, corsOptions)
// }  

// app.options('*', cors(corsOptionsProvider))

// Set Header
// app.use(function(req, res, next) {
//     res.setHeader("Access-Control-Allow-Headers", "Accept, Accept-Language, Content-Type, X-Requested-With, Authorization, Origin");
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     next();
// });




// app.post('/form/send', function (req, res, next) {

//     var host = req.headers['host']
//     var contentType = req.headers['content-type']
//     var contentLength = req.headers['content-length']
//     var userAgent = req.headers['user-agent']
//     var accept = req.headers['accept']
//     var acceptEncoding = req.headers['accept-encoding']
//     var connection = req.headers['connection']
//     var origin = req.headers['origin']

//     const { name = '', phone = '' } = req.body.contacts
//     const { message = '' } = req.body

//     const date = new Date()
//     const dateOptions = {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         // weekday: 'long' // День недели
//     };

//     if (from === 'www.pilprod.com') {
//         this.toEmail = 'contact@pilprod.com'
//         this.subject = 'Заявка от ' + from
//         this.date = date.toLocaleDateString('ru-RU', dateOptions)
//         this.time = date.toLocaleTimeString('ru-RU')
//     }
//     else if (from === 'www.technobox67.ru') {
//         this.toEmail = 'technobox67@yandex.ru'
//         this.subject = 'Заявка от ' + from
//         this.date = date.toLocaleDateString('ru-RU', dateOptions)
//         this.time = date.toLocaleTimeString('ru-RU')
//     }
//     else { // Temp
//         this.toEmail = 'pilprod@yandex.ru'
//         this.subject = 'Заявка от ' + from
//         this.date = date.toLocaleDateString('ru-RU', dateOptions)
//         this.time = date.toLocaleTimeString('ru-RU')
//     }

//     const mailOptions = {
//         from: process.env.MAIL_FROM_NAME + process.env.MAIL_FROM_EMAIL,
//         to: this.toEmail,
//         subject: this.subject,
//         html: `
//         <head>
//             <meta charset="utf-8">
//         </head>
//         <h2>Данные клиента</h2>
//         <ul class="list-group">
//             <li>Имя: ${name}</li>
//             <li>Номер телефона: ${phone}</li>
//         </ul>
//         <h3>Информация:</h3>
//         <ul class="list-group">
//             <li>Сообщение: ${message}</li>
//         </ul>
//         <h4>Доп.информация:</h4>
//         <ul class="list-group">
//             <li>Дата: ${this.date}</li>
//             <li>Время: ${this.time}</li>
//         </ul>
//         <h5>JSON.Headers</h5>
//         <ul class="list-group">
//             <li>Content-Type: ${contentType}</li>
//             <li>Content-Length: ${contentLength}</li>
//             <li>Host: ${host}</li>
//             <li>User-Agent: ${userAgent}</li>
//             <li>Accept: ${accept}</li>
//             <li>Accept-Encoding: ${acceptEncoding}</li>
//             <li>Connection: ${connection}</li>
//             <li>From: ${from}"</li>
//         </ul>
//         `,
//     };
//     try {
//         transporter.sendMail(mailOptions, function (err, info) {
//             if (err) {
//                 res.status(500).send({
//                     success: false,
//                     message: 'Что-то пошло не так! Повторите попытку позже.'
//                 });
//             } else {
//                 res.send({
//                     success: true,
//                     message: 'Спасибо! Скоро мы свяжемся с вами.'
//                 });
//             }
//         });
//     } catch (error) {
//         res.status(500).send({
//             success: false,
//             message: 'Что-то пошло не так! Повторите попытку позже.'
//         });
//     }
// });

// TechnoBOX API Section
// app.get('/technobox', function (req, res) {
//     res.send('API для TechnoBox');
// });

// app.get('/technobox/form', function (req, res) {
//     res.send('Для отправки данных нужно сделать POST-запрос на /technobox/form/send');
// });

// app.get('/technobox/form/send', function (req, res) {
//     res.send('Для отправки данных нужно сделать POST-запрос');
// });

// app.post('/technobox/form/send', function (req, res) {
//     try {

//         const { host } = req.headers

//         const {
//             name = '',
//             phone = '',
//             message = ''
//         } = req.body

//         const mailOptions = {
//             from: process.env.MAIL_FROM_NAME + process.env.MAIL_FROM_EMAIL,
//             to: process.env.MAIL_TO_TECHNOBOX67,
//             subject: process.env.MAIL_SUBJECT_TECHNOBOX67,
//             html: `
//             <head>
//                 <meta charset="utf-8">
//             </head>
//             <h3>Данные клиента</h3>
//             <ul class="list-group">
//                 <li>Имя: ${name}</li>
//                 <li>Номер телефона: ${phone}</li>
//                 <li>Сообщение: ${message}</li>
//             </ul>
//             `,
//         };
//         transporter.sendMail(mailOptions, function (err, info) {
//             if (err) {
//                 res.status(500).send({
//                     success: false,
//                     message: 'Что-то пошло не так! Повторите попытку позже.'
//                 });
//             } else {
//                 res.send({
//                     success: true,
//                     message: 'Спасибо! Скоро мы свяжемся с вами.'
//                 });
//             }
//         });
//     } catch (error) {
//         res.status(500).send({
//             success: false,
//             message: 'Что-то пошло не так! Повторите попытку позже.'
//         });
//     }
// }); }
// });