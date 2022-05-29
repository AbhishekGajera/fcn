const express = require('express');
const validate = require('../../middlewares/validate');
const costValidation = require('../../validations/cost.validation');
const costController = require('../../controllers/cost.controller');
const formidable = require('express-formidable');


const router = express.Router();
router.use(formidable())

router.post('/add-cost', costController.costApprove);
router.get('/fetch-cost', costController.getCosts);
router.get('/delete-cost/:costId',validate(costValidation.deleteCost), costController.deleteCost);

module.exports = router;
