const express = require('express');
const validate = require('../../middlewares/validate');
const employeeValidation = require('../../validations/employee.validation');
const employeeController = require('../../controllers/employee.controller');

const router = express.Router();

router.post('/create-emp', employeeController.createEmp);
router.post('/update-emp/:id', employeeController.updateEmployee);
router.delete('/delete-emp/:id', employeeController.empDelete);
router.get('/fetch-employee', employeeController.getEmp);
router.get('/fetch-employee-by-branch', employeeController.getEmployeeByBranch);
router.post('/approve-leave', validate(employeeValidation.approveLeave), employeeController.leaveApprove);
router.post('/update-leave', validate(employeeValidation.updateLeave), employeeController.leaveUpdate);
router.delete('/delete-leave/:leave_id', validate(employeeValidation.deleteLeave), employeeController.leaveDelete);
router.get('/getLeaves', employeeController.getLeaves);

module.exports = router;
