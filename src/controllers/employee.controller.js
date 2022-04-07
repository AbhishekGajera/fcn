const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { approveLeave, updateLeaveById, deleteLeaveById } = require('../services/employee.service');

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

module.exports = {
  leaveApprove,
  leaveUpdate,
  leaveDelete,
};
