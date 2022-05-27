const express = require('express');
const validate = require('../../middlewares/validate');
const addCost = require('../../validations/cost.validation');
const costController = require('../../controllers/cost.controller');
const formidable = require('express-formidable');


const router = express.Router();
router.use(formidable())

router.post('/add-cost', costController.costApprove);

module.exports = router;
