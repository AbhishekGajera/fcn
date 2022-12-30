const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const visasValidation = require('../../validations/visa.validation');
const visasController = require('../../controllers/visa.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(visasValidation.createVisas), visasController.createVisa)
  .get(auth(), validate(visasValidation.getVisas), visasController.getVisas);

router
  .route('/:visaId')
  .get(auth(), validate(visasValidation.getVisa), visasController.getVisa)
  .patch(auth(), validate(visasValidation.updateVisas), visasController.updateVisa)
  .delete(auth(), validate(visasValidation.deleteVisa), visasController.deleteVisa);

module.exports = router;