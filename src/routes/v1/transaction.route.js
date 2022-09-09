const express = require('express');
const validate = require('../../middlewares/validate');
const transactionValidation = require('../../validations/transaction.validation');
const transactionController = require('../../controllers/transaction.controller');
const auth = require('../../middlewares/auth');


const router = express.Router();



router
.route('/add-transaction')
.post(auth(),transactionController.transactionAdd)

router
.route('/fetch-transaction')
.get(auth(),transactionController.getTransaction)

router
.route('/get-transaction-user/:Transid')
.get(transactionController.getTransactionByUser)

router
.route('/update-transaction')
.patch(transactionController.transactionUpdate)

router
.route('/delete-transaction/:transactionId')
.get(auth(),validate(transactionValidation.deleteTransaction), transactionController.transactionDelete)

// router
// .route('/delete-target/:targetId')
// .get(auth(),targetController.targetDelete)

module.exports = router;
