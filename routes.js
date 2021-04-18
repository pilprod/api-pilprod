const
    express = require("express"),
    router = express.Router();

router.route('/v1')
    .get((req, res) => {
            res.send('Для отправки данных нужно сделать POST-запрос на /form/send')
            res.json({ message: 'Для отправки данных нужно сделать POST-запрос на /form/send' })
            console.info("GET /form")
        });
    // .post((req, res) => {...})
    // .put((req, res) => {...})
    // .delete((req, res) => {...});

module.exports = router;