const express = require('express');
const validate = require('../../middlewares/validate');
const targetValidation = require('../../validations/target.validation');
const targetController = require('../../controllers/target.controller');
const auth = require('../../middlewares/auth');


const router = express.Router();

router
.route('/add-target')
.post(auth(), targetController.targetApprove)

router
.route('/fetch-target')
.get(auth(), targetController.getTargets)

router
.route('/delete-target/:targetId')
.get(auth(),validate(targetValidation.deleteTarget), targetController.targetDelete)

module.exports = router;
