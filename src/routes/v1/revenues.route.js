const express = require('express');
const validate = require('../../middlewares/validate');
const revenueController = require('../../controllers/revenue.controller');
const auth = require('../../middlewares/auth');


const router = express.Router();

router
.route('/add-revenue')
.post(auth(),revenueController.revenueAdd)

router
.route('/fetch-revenue')
.get(auth(),revenueController.getRevenue)



module.exports = router;
