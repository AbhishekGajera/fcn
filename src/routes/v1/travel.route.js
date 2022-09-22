const express = require('express');
const validate = require('../../middlewares/validate');
const travelValidation = require('../../validations/travel.validation');
const travelController = require('../../controllers/travel.controller');
const auth = require('../../middlewares/auth');


const router = express.Router();



router
.route('/add-travel')
.post(auth(),travelController.travelAdd)

router
.route('/fetch-travel')
.get(auth(),travelController.getTravel)

router
.route('/get-travel-user/:Transid')
.get(travelController.getTravelByUser)

router
.route('/get-travel-branch')
.get(travelController.getTravelByBranch)

router
.route('/update-travel')
.patch(travelController.travelUpdate)

router
.route('/delete-travel/:travelId')
.get(auth(),validate(travelValidation.deleteTravel), travelController.travelDelete)

// router
// .route('/delete-target/:targetId')
// .get(auth(),targetController.targetDelete)

module.exports = router;
