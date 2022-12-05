const express = require('express');
const validate = require('../../middlewares/validate');
const poweroneValidation = require('../../validations/powerone.validation');
const poweroneController = require('../../controllers/powerone.controller');
const auth = require('../../middlewares/auth');


const router = express.Router();



router
    .route('/add-powerone')
    .post(auth(), poweroneController.poweroneAdd)

router
    .route('/fetch-powerone')
    .get(auth(), poweroneController.getPowerone)

router
    .route('/get-powerone/:id')
    .get(poweroneController.getPoweroneByUser)

router
    .route('/get-powerone-branch')
    .get(poweroneController.getPoweroneByBranch)

router
    .route('/update-powerone/:id')
    .post(poweroneController.poweroneUpdate)

router
    .route('/delete-powerone/:poweroneId')
    .get(auth(), validate(poweroneValidation.deletePowerogetPowerone), poweroneController.poweroneDelete)

// router
// .route('/delete-target/:targetId')
// .get(auth(),targetController.targetDelete)

module.exports = router;
