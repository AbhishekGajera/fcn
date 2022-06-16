const express = require('express');
const validate = require('../../middlewares/validate');
const contactController = require('../../controllers/contact.controller');
const auth = require('../../middlewares/auth');


const router = express.Router();

router
.route('/add-contact')
.post(contactController.contactAdd)

router
.route('/fetch-contact')
.get(contactController.getContacts)



module.exports = router;
