const express = require('express');
const validate = require('../../middlewares/validate');
const appoinmentsValidation = require('../../validations/appoinments.validation');
const appoinmentsController = require('../../controllers/appoinments.controller');
const auth = require('../../middlewares/auth');


const router = express.Router();

router
.route('/add-appoinment')
.post(auth(), appoinmentsController.appoinmentsApprove)

router
.route('/update-appoinment')
.patch(auth(), appoinmentsController.appoinmentsUpdate)

router
.route('/fetch-appoinment')
.get(auth(), appoinmentsController.getAppoinments)

router
.route('/delete-appoinment/:appoinmentId')
.get(auth(),validate(appoinmentsValidation.deleteAppoinmnets), appoinmentsController.appoinmentsDelete)

module.exports = router;
