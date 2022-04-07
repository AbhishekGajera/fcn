const express = require('express');
const validate = require('../../middlewares/validate');
const employeeValidation = require('../../validations/employee.validation');
const employeeController = require('../../controllers/employee.controller');

const router = express.Router();

router.post('/approve-leave', validate(employeeValidation.approveLeave), employeeController.leaveApprove);
router.post('/update-leave', validate(employeeValidation.updateLeave), employeeController.leaveUpdate);
router.delete('/delete-leave/:leave_id', validate(employeeValidation.deleteLeave), employeeController.leaveDelete);

module.exports = router;
