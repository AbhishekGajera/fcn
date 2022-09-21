const express = require('express');
const validate = require('../../middlewares/validate');
const travelQueryValidation = require('../../validations/travelQuery.validation');
const travelQueryController = require('../../controllers/travelQuery.controller');
const auth = require('../../middlewares/auth');


const router = express.Router();



router
.route('/add-travelQuery')
.post(auth(),travelQueryController.travelQueryAdd)

router
.route('/fetch-travelQuery')
.get(auth(),travelQueryController.getTravelQuery)

router
.route('/get-travelQuery-user/:Transid')
.get(travelQueryController.getTravelQueryByUser)

router
.route('/get-travelQuery-branch')
.get(travelQueryController.getTravelQueryByBranch)

router
.route('/update-travelQuery')
.patch(travelQueryController.travelQueryUpdate)

router
.route('/delete-travelQuery/:travelQueryId')
.get(auth(),validate(travelQueryValidation.deleteTravelQuery), travelQueryController.travelQueryDelete)

// router
// .route('/delete-target/:targetId')
// .get(auth(),targetController.targetDelete)

module.exports = router;
