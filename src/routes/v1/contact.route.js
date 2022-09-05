const express = require('express');
const validate = require('../../middlewares/validate');
const contactController = require('../../controllers/contact.controller');
const auth = require('../../middlewares/auth');


const router = express.Router();

router
.route('/add-contact')
.post(contactController.contactAdd)


// getConnectedById

router
.route('/fetch-contact')
.get(contactController.getContacts)

router
.route('/get-connected-id/:id')
.get(contactController.getConnectId)



module.exports = router;
