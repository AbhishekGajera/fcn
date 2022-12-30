const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const passportsValidation = require('../../validations/passport.validation');
const passportsController = require('../../controllers/passport.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(passportsValidation.createPassports), passportsController.createPassport)
  .get(auth(), validate(passportsValidation.getPassports), passportsController.getPassports);

router
  .route('/:passportId')
  .get(auth(), validate(passportsValidation.getPassport), passportsController.getPassport)
  .patch(auth(), validate(passportsValidation.updatePassports), passportsController.updatePassport)
  .delete(auth(), validate(passportsValidation.deletePassport), passportsController.deletePassport);

module.exports = router;