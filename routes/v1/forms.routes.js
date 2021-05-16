const express = require('express'),
    router = express.Router(),
    FormsController = require('../../controllers/v1/forms.controller')

router
    .route('/')
    .get(FormsController.getForms)
    .post(FormsController.sendForms)

module.exports = router