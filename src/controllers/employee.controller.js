const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { approveLeave, updateLeaveById, deleteLeaveById, getLeavesList, createEmployee, getEmployeeList , updateEmployeeById, deleteEmpById } = require('../services/employee.service');
const pick = require('../utils/pick');


const leaveApprove = catchAsync(async (req, res) => {
  const result = await approveLeave(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const leaveUpdate = catchAsync(async (req, res) => {
  const result = await updateLeaveById(req.body.leave_id,req.body);
  res.send(result);
});

const leaveDelete = catchAsync(async (req, res) => {
  await deleteLeaveById(req.params.leave_id);
  res.status(httpStatus.NO_CONTENT).send();
});

const getLeaves = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getLeavesList(filter, options);
  res.send(result);
});

const createEmp = catchAsync(async (req, res) => {
  const user = await createEmployee(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getEmp = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role','custom']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getEmployeeList(filter, options);
  res.send(result);
});

const getEmployeeByBranch = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['branch']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getEmployeeList(filter, options);
  res.send(result);
});

const updateEmployee = catchAsync(async (req, res) => {
  const user = await updateEmployeeById(req.params.id, req.body);
  res.send(user);
});

const empDelete = catchAsync(async (req, res) => {
  await deleteEmpById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  leaveApprove,
  leaveUpdate,
  leaveDelete,
  getLeaves,
  createEmp,
  getEmp,
  getEmployeeByBranch,
  updateEmployee,
  empDelete
};
